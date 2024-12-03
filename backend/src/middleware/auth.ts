import { Elysia } from 'elysia'
import type { User } from '../types/user'
import { cookieConfig } from '../lib/cookie.config'

class AuthError extends Error {
  constructor(
    message: string,
    public status: number = 401
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export const authMiddleware = new Elysia()
  .error({
    UNAUTHORIZED: AuthError
  })
  .derive(({ jwt, cookie }: any) => ({
    getUser: async () => {
      const token = cookie.auth_token.value

      if (!token) {
        throw new AuthError('No token provided')
      }

      const payload = await jwt.verify(token)
      if (!payload) {
        throw new AuthError('Invalid token')
      }

      return payload as { id: string; role: string }
    }
  }))
  .derive(({ getUser }) => ({
    requireAuth: async () => {
      const user = await getUser()
      if (!user) {
        throw new AuthError('Authentication required')
      }
      return user
    },
    requireRole: async (allowedRoles: string[]) => {
      const user = await getUser()
      if (!user || !allowedRoles.includes(user.role)) {
        throw new AuthError('Insufficient permissions', 403)
      }
      return user
    }
  }))

export const verifyAuth = authMiddleware.derive(({ requireAuth }) => ({
  beforeHandle: async ({ set }: any) => {
    try {
      await requireAuth()
    } catch (error) {
      if (error instanceof AuthError) {
        set.status = error.status
        return { error: error.message }
      }
      throw error
    }
  }
}))

export const verifyRole = (roles: string[]) => 
  authMiddleware.derive(({ requireRole }) => ({
    beforeHandle: async ({ set }: any) => {
      try {
        await requireRole(roles)
      } catch (error) {
        if (error instanceof AuthError) {
          set.status = error.status
          return { error: error.message }
        }
        throw error
      }
    }
  }))
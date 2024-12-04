import { Elysia } from 'elysia'
import { ApiError } from '../types/apiError'
import { verifyToken } from '../lib/auth'
import { UserRole } from '../types/user'
import { getUserRole } from '../db/auth'
import { RequestUser } from '../types/request'

const auth = new Elysia()
  .derive(({ request }) => {
    const authHeader = request.headers.get('authorization')
    return { authHeader }
  })
  .derive(async ({ authHeader }) => {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, 'Missing or invalid authorization header')
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    if (!decoded) {
      throw new ApiError(401, 'Invalid token')
    }

    const userRole = await getUserRole(decoded.id)

    const user: RequestUser = { 
      id: decoded.id,
      role: userRole
    }

    return { user }
  })

export { auth }
import { Elysia } from 'elysia'
import { ApiError } from '../types/apiError'
import { verifyToken } from '../lib/auth'

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

    return { user: { id: decoded.id } }
  })

export { auth }
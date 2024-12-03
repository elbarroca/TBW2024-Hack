import { jwt } from '@elysiajs/jwt'
import { t } from 'elysia'

export type JWTPayload = {
  id: string
  role: string
  exp?: number
}

export const jwtConfig = jwt({
  name: 'jwt',
  secret: process.env.JWT_SECRET!,
  exp: '7d',
  schema: t.Object({
    id: t.String(),
    role: t.String(),
    exp: t.Optional(t.Number())
  })
}) 
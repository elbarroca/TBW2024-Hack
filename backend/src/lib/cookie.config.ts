import { t } from 'elysia'

export const cookieConfig = {
  secrets: process.env.SECRET!,
  sign: ['auth_token'],
  cookie: t.Cookie({
    auth_token: t.Optional(t.String())
  }, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/'
  })
} 
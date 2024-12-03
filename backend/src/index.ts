import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { config } from "./lib/config";
import { jwtConfig } from "./lib/jwt.config";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import { solanaManager } from "./routes/solana";
import enrollmentRoutes from "./routes/enrollment";
import { contentRoutes } from "./routes/content";
import { courseRoutes } from "./routes/course";
import { verifyAuth } from "./middleware/auth";
import { cookieConfig } from './lib/cookie.config'
import { errorHandler } from './types/apiError';

const apiGroup = new Elysia({ prefix: '/api' })
  .use(verifyAuth)
  .use(userRoutes)
  .use(solanaManager)
  .use(enrollmentRoutes)
  .use(contentRoutes)
  .use(courseRoutes)

const app = new Elysia({
  cookie: cookieConfig
})
  .onError(({ code, error }) => {
    return errorHandler(error);
  })
  .derive(({ request, set }) => {
    return {
      success: (data: any) => ({
        status: 'success',
        statusCode: 200,
        data
      }),
      created: (data: any) => {
        set.status = 201;
        return {
          status: 'success',
          statusCode: 201,
          data
        };
      }
    };
  })
  .use(swagger({
    documentation: {
      info: {
        title: "Mentora API",
        version: "1.0.0"
      },
      tags: [
        { name: "auth", description: "Authentication endpoints" },
        { name: "users", description: "User management" },
        { name: "content", description: "Content management" },
        { name: "courses", description: "Course management" },
        { name: "enrollments", description: "Enrollment management" },
        { name: "solana", description: "Solana blockchain integration" }
      ]
    }
  }))
  .use(
    cors({
      origin: config.CORS_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    })
  )
  .use(jwtConfig)
  .use(authRoutes)
  .use(apiGroup)
  .listen(config.PORT);

console.log(`🦊 Server running at http://${config.HOST}:${config.PORT}`);

/* to-do: granular permissions control
app.group('/api/admin', app => app
  .use(verifyRole(['admin']))
  .get('/stats', handler)
)

app.group('/api/instructor', app => app
  .use(verifyRole(['admin', 'instructor']))
  .post('/courses', handler)
)
*/



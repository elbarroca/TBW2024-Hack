import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { config } from "./lib/config";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import { solanaManager } from "./routes/solana";
import enrollmentRoutes from "./routes/enrollment";
import { contentRoutes } from "./routes/content";
import { courseRoutes } from "./routes/course";

const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: "Learning Platform API",
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
      origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    })
  )
  .use(authRoutes)
  .use(userRoutes)
  .use(solanaManager)
  .use(enrollmentRoutes)
  .use(contentRoutes)
  .use(courseRoutes)
  .listen(config.PORT);

console.log(`🦊 Server running at http://${config.HOST}:${config.PORT}`);

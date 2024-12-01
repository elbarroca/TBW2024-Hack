import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { config } from "./lib/config";
import { solanaManager } from "./solanaManager";
import { swagger } from "@elysiajs/swagger";

new Elysia()
  .use(swagger())
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(solanaManager)
  .listen(config.PORT);

console.log(`🦊 Elysia is running at http://${config.HOST}:${config.PORT}`);

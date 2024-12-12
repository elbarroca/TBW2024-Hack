import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors';
import { config } from "./config";
import { metaplexManager } from './metaplexManager';
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
  .use(swagger())
  .use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }))
  .use(metaplexManager)
  .listen(config.PORT);

console.log(
  `🦊 Metaplex server is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
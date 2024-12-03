import { Elysia } from "elysia";
import type { RequestWithUser } from "../types/content";
import { getUser } from "../db/auth";

export const userRoutes = new Elysia()
  .get("/users/:id", 
    async ({ params, request }: { params: { id: string }, request: RequestWithUser }) => {
      try {
        const user = await getUser(params.id);
        if (!user) {
          return { error: "User not found", status: 404 };
        }
        return { user, status: 200 };
      } catch (error: any) {
        return { error: error.message, status: 500 };
      }
    })
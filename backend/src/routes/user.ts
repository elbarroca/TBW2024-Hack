import { Elysia, t } from "elysia";
import { getUserById, createUser } from "../db/user";
import type { NewUser } from "../types/user";
import type { RequestWithUser } from "../types/content";

const createUserSchema = t.Object({
  address: t.String(),
  email: t.String(),
  full_name: t.Optional(t.String()),
  avatar_url: t.Optional(t.String())
});

interface HandlerContext {
  request: RequestWithUser;
}

export const userRoutes = new Elysia()
  .get("/users/:id", 
    async ({ params, request }: { params: { id: string }, request: RequestWithUser }) => {
      try {
        const user = await getUserById(params.id);
        if (!user) {
          return { error: "User not found", status: 404 };
        }
        return { user, status: 200 };
      } catch (error: any) {
        return { error: error.message, status: 500 };
      }
    })

  .post("/users", 
    async ({ body }) => {
      try {
        const userData: NewUser = {
          address: body.address,
          email: body.email,
          full_name: body.full_name || null,
          avatar_url: body.avatar_url || null,
          last_auth: null,
          last_auth_status: null,
          nonce: null,
          billing_address: null,
          payment_method: null,
          role: 'student'
        };

        const user = await createUser({
          ...userData,
          role: 'student'
        });

        if (!user) {
          return { error: "Failed to create user", status: 500 };
        }

        return { user, status: 201 };
      } catch (error: any) {
        return { error: error.message, status: 500 };
      }
    },
    { body: createUserSchema }); 
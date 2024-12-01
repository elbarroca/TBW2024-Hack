import { Elysia, t } from "elysia";
import { createToken } from "../lib/jwt";
import { updateNonce, getNonce, createUser, getUserById } from "../db/user";
import { verifySignature } from "../lib/verifySignature";
import { generateNonce } from "../lib/nonce";
import type { NewUser } from "../types/user";

const authSchema = {
  nonce: t.Object({
    address: t.String({ pattern: "^[1-9A-HJ-NP-Za-km-z]{32,44}$" })
  }),
  verify: t.Object({
    address: t.String({ pattern: "^[1-9A-HJ-NP-Za-km-z]{32,44}$" }),
    signature: t.String()
  })
};

export const authRoutes = new Elysia()
  .post("/auth/nonce", 
    async ({ body }) => {
      try {
        const nonce = generateNonce();
        await updateNonce(body.address, nonce);
        return { nonce, status: 200 };
      } catch (error: any) {
        console.error("Error generating nonce:", error);
        return { error: "Failed to generate nonce", status: 500 };
      }
    }, 
    { body: authSchema.nonce })
  
  .post("/auth/verify", 
    async ({ body }) => {
      try {
        const nonce = await getNonce(body.address);
        if (!nonce) {
          return { error: "Nonce not found or expired", status: 401 };
        }

        const isValid = await verifySignature(body.address, body.signature, nonce);
        if (!isValid) {
          return { error: "Invalid signature", status: 401 };
        }

        let user = await getUserById(body.address);
        if (!user) {
          const newUser: NewUser = {
            address: body.address,
            email: `${body.address}@placeholder.com`,
            avatar_url: null,
            full_name: null,
            last_auth: new Date().toISOString(),
            last_auth_status: "success",
            nonce: null,
            billing_address: null,
            payment_method: null,
            role: "student"
          };
          
          user = await createUser(newUser);
          if (!user) {
            return { error: "Failed to create user", status: 500 };
          }
        }

        const token = createToken(user);
        return { user, token, status: 200 };
      } catch (error: any) {
        console.error("Error verifying auth:", error);
        return { error: "Authentication failed", status: 500 };
      }
    },
    { body: authSchema.verify }); 
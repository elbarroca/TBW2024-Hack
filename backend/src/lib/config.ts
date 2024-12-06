export const config = {
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || "3000",
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_KEY: process.env.SUPABASE_KEY!,
};

const requiredEnvVariables = [
  "RPC_KEY",
  "SUPABASE_URL",
  "SUPABASE_KEY"
];

requiredEnvVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
});
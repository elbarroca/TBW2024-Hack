export const config = {
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || "3000",
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_KEY: process.env.SUPABASE_KEY!,
  RPC_KEY: process.env.RPC_KEY || 'GET_A_FALLBACK_KEY',
  BIRDEYE_API_KEY: process.env.BIRDEYE_API_KEY!,
};

const requiredEnvVariables = [
  "RPC_KEY",
  "SUPABASE_URL",
  "SUPABASE_KEY",
  "BIRDEYE_API_KEY"
];

requiredEnvVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
});
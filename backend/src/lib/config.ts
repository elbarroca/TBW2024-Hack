import { createDefaultRpcTransport, createRpc, createSolanaRpcApi } from "@solana/rpc";

const heliusRpcTransport = createDefaultRpcTransport({ 
  url: `https://mainnet.helius-rpc.com/?api-key=${process.env.RPC_KEY!}` 
});

const solanaApi = createSolanaRpcApi({ defaultCommitment: 'confirmed' });

export const config = {
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || "3000",
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
  RPC: createRpc({
    api: solanaApi,
    transport: heliusRpcTransport,
  }),
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_KEY: process.env.SUPABASE_KEY!,
};

const requiredEnvVariables = [
  "RPC_KEY",
];

requiredEnvVariables.forEach((variable) => {
  if (config[variable as keyof typeof config] === "") {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
});
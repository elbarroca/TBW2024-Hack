import { createDefaultRpcTransport, createRpc, createSolanaRpcApi, DEFAULT_RPC_CONFIG } from "@solana/rpc";

const heliusRpcTransport = createDefaultRpcTransport({ 
  url: `https://mainnet.helius-rpc.com/?api-key=${process.env.RPC_KEY!}` 
});

const solanaApi = createSolanaRpcApi(DEFAULT_RPC_CONFIG);

export const config = {
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || "3001",
  RPC: createRpc({
    api: solanaApi,
    transport: heliusRpcTransport,
  }),
};

const requiredEnvVariables = [
  "RPC_KEY",
];

requiredEnvVariables.forEach((variable) => {
  if (config[variable as keyof typeof config] === "") {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
});
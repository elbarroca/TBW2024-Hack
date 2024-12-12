import { Connection, Keypair } from "@solana/web3.js";
import bs58 from 'bs58';

export const config = {
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || '3001',
  RPC: new Connection(`https://mainnet.helius-rpc.com/?api-key=${process.env.RPC_KEY!}`),
  FILES_KEYPAIR: Keypair.fromSecretKey(Buffer.from(bs58.decode(process.env.FILES_KEYPAIR!))),
};

const requiredEnvVariables = [
  'RPC_KEY',
  'FILES_KEYPAIR',
];

requiredEnvVariables.forEach(variable => {
  if (config[variable as keyof typeof config] === '') {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
});

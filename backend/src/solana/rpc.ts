import { 
  createDefaultRpcTransport, 
  createRpc, 
  createSolanaRpcApi,
  type Rpc,
  type GetEpochInfoApi,
  type GetSignatureStatusesApi,
  type SendTransactionApi
} from "@solana/rpc";

// RPC HTTP Transport
const heliusRpcTransport = createDefaultRpcTransport({ 
  url: `https://mainnet.helius-rpc.com/?api-key=${process.env.RPC_KEY!}` 
});

// Create API
const solanaApi = createSolanaRpcApi({ defaultCommitment: 'confirmed' });

// Create RPC client
export const rpc = createRpc({ 
  api: solanaApi, 
  transport: heliusRpcTransport 
});

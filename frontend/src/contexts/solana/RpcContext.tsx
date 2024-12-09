import type { Rpc, RpcSubscriptions, SolanaRpcApiMainnet, SolanaRpcSubscriptionsApi } from '@solana/web3.js';
import { createSolanaRpc, createSolanaRpcSubscriptions, mainnet } from '@solana/web3.js';
import { createContext } from 'react';

export const RpcContext = createContext<{
    rpc: Rpc<SolanaRpcApiMainnet>; // Limit the API to only those methods found on Mainnet (ie. not `requestAirdrop`)
    rpcSubscriptions: RpcSubscriptions<SolanaRpcSubscriptionsApi>;
}>({
    rpc: createSolanaRpc(mainnet('https://api.mainnet-beta.solana.com')),
    rpcSubscriptions: createSolanaRpcSubscriptions(mainnet('wss://api.mainnet-beta.solana.com')),
});

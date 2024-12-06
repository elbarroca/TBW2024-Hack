import { type Signature } from '@solana/keys';
import { type SolanaRpcResponse, type TransactionError } from '@solana/rpc-types';
import { WebSocket } from 'ws';
import { rpc } from '../rpc';
import { sendAndConfirmTransactionFactory } from '@solana/web3.js';

// WebSocket setup
const wsEndpoint = 'wss://mainnet.helius-rpc.com/?api-key=' + process.env.RPC_KEY!;
const ws = new WebSocket(wsEndpoint);

// Types for WebSocket responses
interface WsNotification {
  jsonrpc: '2.0';
  method: 'signatureNotification';
  params: {
    result: SolanaRpcResponse<Readonly<{
      err: TransactionError | null;
    }>>;
    subscription: number;
  };
}

// Create RPC subscriptions
const rpcSubscriptions = {
  signatureNotifications(signature: Signature) {
    return {
      async subscribe(options: Readonly<{ abortSignal: AbortSignal }>) {
        const subscriptionId = await new Promise<number>((resolve) => {
          const subscribeMsg = {
            jsonrpc: '2.0',
            id: 1,
            method: 'signatureSubscribe',
            params: [
              signature,
              { commitment: 'confirmed' }
            ]
          };

          ws.send(JSON.stringify(subscribeMsg));

          ws.once('message', (data) => {
            const response = JSON.parse(data.toString());
            resolve(response.result);
          });
        });

        const notifications = {
          async next() {
            const result = await new Promise<WsNotification['params']['result']>((resolve) => {
              const messageHandler = (data: Buffer) => {
                const response = JSON.parse(data.toString()) as WsNotification;
                if (
                  response.method === 'signatureNotification' && 
                  response.params.subscription === subscriptionId
                ) {
                  ws.removeListener('message', messageHandler);
                  resolve(response.params.result);
                }
              };

              ws.on('message', messageHandler);
              options.abortSignal.addEventListener('abort', () => {
                ws.removeListener('message', messageHandler);
              });
            });

            return { done: true, value: result };
          },
          [Symbol.asyncIterator]() {
            return this;
          },
        };

        options.abortSignal.addEventListener('abort', () => {
          ws.send(JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'signatureUnsubscribe',
            params: [subscriptionId]
          }));
        });

        return notifications;
      }
    };
  },
  slotNotifications(_?: Record<string, never>) {
    return {
      async subscribe() {
        return {
          async next() {
            return { done: true, value: { parent: 0n, root: 0n, slot: 0n } };
          },
          [Symbol.asyncIterator]() {
            return this;
          }
        };
      }
    };
  }
};

// Create transaction sender with WebSocket confirmation
export const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({
  rpc,
  rpcSubscriptions,
});

// Cleanup WebSocket on process exit
process.on('SIGINT', () => {
  ws.close();
  process.exit();
});

process.on('SIGTERM', () => {
  ws.close();
  process.exit();
}); 
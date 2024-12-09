import { type IInstruction } from '@solana/instructions';
import { JupiterSwapInstructions, JupiterQuoteParams, JupiterSwapParams } from '../types';
import { deserializeInstruction } from './instructions';

async function getJupiterQuote(params: JupiterQuoteParams) {
  const searchParams = new URLSearchParams({
    inputMint: params.inputMint,
    outputMint: params.outputMint,
    amount: params.amount,
    slippageBps: params.slippageBps.toString(),
    ...(params.swapMode && { swapMode: params.swapMode }),
    ...(params.dexes?.length && { dexes: params.dexes.join(',') }),
    ...(params.onlyDirectRoutes && { onlyDirectRoutes: 'true' }),
  });

  const response = await fetch(
    `https://quote-api.jup.ag/v6/quote?${searchParams.toString()}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  );

  const quote = await response.json();
  if (quote.error) {
    throw new Error(`Failed to get Jupiter quote: ${quote.error}`);
  }
  return quote;
}

async function getJupiterInstructions(
  params: JupiterSwapParams
): Promise<JupiterSwapInstructions> {
  const response = await fetch('https://quote-api.jup.ag/v6/swap-instructions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quoteResponse: params.quoteResponse,
      userPublicKey: params.userPublicKey,
      wrapAndUnwrapSol: params.wrapAndUnwrapSol ?? true,
      useSharedAccounts: params.useSharedAccounts ?? false,
      dynamicComputeUnitLimit: params.dynamicComputeUnitLimit ?? false,
      skipUserAccountsRpcCalls: params.skipUserAccountsRpcCalls ?? true,
      asLegacyTransaction: params.asLegacyTransaction ?? false,
      useTokenLedger: params.useTokenLedger ?? false,
    })
  });

  const instructions = await response.json();
  if (instructions.error) {
    throw new Error(`Failed to get swap instructions: ${instructions.error}`);
  }

  return instructions;
}

export async function buildJupiterInstructions(
  inputToken: string,
  outputToken: string,
  amount: number,
  slippageBps: number,
  userPublicKey: string,
  decimals: number = 6
): Promise<{
  instructions: IInstruction<string>[],
  lookupTableAddresses: string[]
}> {
  const quote = await getJupiterQuote({
    inputMint: inputToken,
    outputMint: outputToken,
    amount: amount.toString(),
    slippageBps,
    swapMode: 'ExactOut',
    dexes: ['Whirlpool', 'Raydium CLMM', 'Raydium CP']
  });
  console.log('quote', quote);

  const swapInstructions = await getJupiterInstructions({
    quoteResponse: quote,
    userPublicKey,
    wrapAndUnwrapSol: true,
    useSharedAccounts: false,
    dynamicComputeUnitLimit: false,
    skipUserAccountsRpcCalls: true,
    asLegacyTransaction: false,
    useTokenLedger: false,
  });

  const instructions = [
    ...(swapInstructions.setupInstructions?.map(ix => deserializeInstruction(JSON.stringify(ix))) || []),
    deserializeInstruction(JSON.stringify(swapInstructions.swapInstruction)),
    ...(swapInstructions.cleanupInstruction ? [deserializeInstruction(JSON.stringify(swapInstructions.cleanupInstruction))] : []),
  ];

  return {
    instructions,
    lookupTableAddresses: swapInstructions.addressLookupTableAddresses || []
  };
} 
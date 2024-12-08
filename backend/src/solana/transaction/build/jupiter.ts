import { type IInstruction } from '@solana/instructions';
import { JupiterSwapInstructions } from '../types';
import { deserializeInstruction } from './instructions';

async function getJupiterQuote(inputToken: string, outputToken: string, amount: number, slippageBps: number, decimals: number = 6) {
  const rawAmount = Math.floor(amount * Math.pow(10, decimals));

  const params = new URLSearchParams({
    inputMint: inputToken,
    outputMint: outputToken,
    amount: rawAmount.toString(),
    slippageBps: slippageBps.toString()
  });

  console.log('Jupiter quote params:', {
    inputMint: inputToken,
    outputMint: outputToken,
    amount: rawAmount,
    slippageBps
  });

  const response = await fetch(
    `https://quote-api.jup.ag/v6/quote?${params.toString()}`,
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
  quoteResponse: any, 
  userPublicKey: string
): Promise<JupiterSwapInstructions> {
  const response = await fetch('https://quote-api.jup.ag/v6/swap-instructions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quoteResponse,
      userPublicKey
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
): Promise<IInstruction<string>[]> {
  const quote = await getJupiterQuote(
    inputToken,
    outputToken,
    amount,
    slippageBps,
    decimals
  );

  const swapInstructions = await getJupiterInstructions(
    quote,
    userPublicKey
  );

  return [
    ...(swapInstructions.setupInstructions?.map(ix => deserializeInstruction(JSON.stringify(ix))) || []),
    deserializeInstruction(JSON.stringify(swapInstructions.swapInstruction)),
    ...(swapInstructions.cleanupInstruction ? [deserializeInstruction(JSON.stringify(swapInstructions.cleanupInstruction))] : [])
  ];
} 
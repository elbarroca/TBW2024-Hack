import { type IInstruction } from '@solana/instructions';
import { JupiterSwapInstructions } from '../types';
import { deserializeInstruction } from './instructions';

async function getJupiterQuote(inputToken: string, outputToken: string, amount: number, slippageBps: number) {
  const response = await fetch(`https://quote-api.jup.ag/v6/quote`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inputMint: inputToken,
      outputMint: outputToken,
      amount: amount.toString(),
      slippageBps: slippageBps
    })
  });

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
  userPublicKey: string
): Promise<IInstruction<string>[]> {
  const quote = await getJupiterQuote(
    inputToken,
    outputToken,
    amount,
    slippageBps
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
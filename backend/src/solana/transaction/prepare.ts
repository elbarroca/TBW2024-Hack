import { address } from '@solana/addresses';
import { pipe } from '@solana/functional';
import { 
  createTransactionMessage,
  setTransactionMessageFeePayer, 
  appendTransactionMessageInstructions,
  setTransactionMessageLifetimeUsingBlockhash,
  compileTransaction, 
  getBase64EncodedWireTransaction,
  type IInstruction
} from '@solana/web3.js';
import { 
  getSetComputeUnitLimitInstruction,
  getSetComputeUnitPriceInstruction 
} from '@solana-program/compute-budget';
import { SimulationResult } from './types';
import { rpc } from '../rpc';

export const PRIORITY_LEVELS = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  VERY_HIGH: "VERY_HIGH",
} as const;

export type PriorityLevel = keyof typeof PRIORITY_LEVELS;

interface PriorityFeeResponse {
  jsonrpc: string;
  result: {
    priorityFeeEstimate: number;
  };
  id: string;
}

async function simulateTransaction(
  instructions: IInstruction<string>[],
  payerAddress: string
): Promise<SimulationResult> {
  try {
    const payer = address(payerAddress);
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    
    const message = pipe(
      createTransactionMessage({ version: 0 }),
      tx => setTransactionMessageFeePayer(payer, tx),
      tx => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      tx => appendTransactionMessageInstructions(instructions, tx)
    );

    const compiledMessage = compileTransaction(message);
    const wireTransaction = getBase64EncodedWireTransaction(compiledMessage);
    const simulation = await rpc.simulateTransaction(wireTransaction, {
      replaceRecentBlockhash: true,
      sigVerify: false,
      encoding: 'base64'
    }).send();

    if (simulation.value.err) {
      return { units: 0, error: JSON.stringify(simulation.value.err) };
    }

    const units = Number(simulation.value.unitsConsumed) || 0;
    return { units: Math.ceil(units * 1.1) };
  } catch (error) {
    return { 
      units: 0, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}

async function getPriorityFeeEstimate(
  instructions: IInstruction<string>[],
  payerAddress: string,
  priorityLevel: PriorityLevel = "MEDIUM"
): Promise<number> {
  try {
    const payer = address(payerAddress);
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    
    const message = pipe(
      createTransactionMessage({ version: 0 }),
      tx => setTransactionMessageFeePayer(payer, tx),
      tx => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      tx => appendTransactionMessageInstructions(instructions, tx)
    );

    const compiledMessage = compileTransaction(message);
    const wireTransaction = getBase64EncodedWireTransaction(compiledMessage);

    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${process.env.RPC_KEY!}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '1',
        method: 'getPriorityFeeEstimate',
        params: [{
          transaction: wireTransaction,
          options: { priorityLevel: PRIORITY_LEVELS[priorityLevel] }
        }]
      })
    });

    const data = await response.json() as PriorityFeeResponse;
    return data.result.priorityFeeEstimate;
  } catch (error) {
    console.error('Error getting priority fee estimate:', error);
    // Default to 5000 microlamports
    return 5000;
  }
}

export async function prepareComputeBudget(
  instructions: IInstruction<string>[],
  payerAddress: string,
  priorityLevel?: PriorityLevel
): Promise<IInstruction<string>[]> {
  const [simulation, priorityFee] = await Promise.all([
    simulateTransaction(instructions, payerAddress),
    getPriorityFeeEstimate(instructions, payerAddress, priorityLevel)
  ]);
  
  const computeBudgetIx = getSetComputeUnitLimitInstruction({
    units: simulation.units || 1_400_000
  });

  const priorityFeeIx = getSetComputeUnitPriceInstruction({
    microLamports: priorityFee
  });

  return [computeBudgetIx, priorityFeeIx, ...instructions];
} 
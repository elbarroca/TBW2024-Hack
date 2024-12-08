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
import { SimulationResult } from '../types';
import { rpc } from '../../rpc';

export const PRIORITY_LEVELS = {
  MIN: "MIN",
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  VERY_HIGH: "VERY_HIGH",
  UNSAFE_MAX: "UNSAFE_MAX"
} as const;

export type PriorityLevel = keyof typeof PRIORITY_LEVELS;

interface PriorityFeeOptions {
  priorityLevel?: PriorityLevel;
  includeAllPriorityFeeLevels?: boolean;
  lookbackSlots?: number;
  includeVote?: boolean;
  recommended?: boolean;
}

interface PriorityFeeResponse {
  jsonrpc: string;
  result: {
    priorityFeeEstimate: number;
    priorityFeeLevels?: {
      min: number;
      low: number;
      medium: number;
      high: number;
      veryHigh: number;
      unsafeMax: number;
    };
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
  options: PriorityFeeOptions = {}
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

    const response = await fetch(`https://api.helius-rpc.com/?api-key=${process.env.RPC_KEY!}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '1',
        method: 'getPriorityFeeEstimate',
        params: [{
          transaction: wireTransaction,
          options: {
            priorityLevel: options.priorityLevel ? PRIORITY_LEVELS[options.priorityLevel] : PRIORITY_LEVELS.MEDIUM,
            includeAllPriorityFeeLevels: options.includeAllPriorityFeeLevels,
            lookbackSlots: options.lookbackSlots,
            includeVote: options.includeVote,
            recommended: options.recommended ?? true,
            transactionEncoding: 'base64'
          }
        }]
      })
    });

    // to-do: another service to handle this
    if (!response.ok) {
      return 10000;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as PriorityFeeResponse;
    
    if (!data.result?.priorityFeeEstimate) {
      throw new Error('Invalid priority fee response');
    }

    return Math.max(data.result.priorityFeeEstimate, 10000);
  } catch (error) {
    console.error('Error getting priority fee estimate:', error);
    return 10000; // Default to minimum recommended fee (10,000 microlamports)
  }
}

export async function prepareComputeBudget(
  instructions: IInstruction<string>[],
  payerAddress: string,
  priorityLevel?: PriorityLevel
): Promise<IInstruction<string>[]> {
  const [simulation, priorityFee] = await Promise.all([
    simulateTransaction(instructions, payerAddress),
    getPriorityFeeEstimate(instructions, payerAddress, {
      priorityLevel,
      recommended: true,
      lookbackSlots: 150
    })
  ]);
  
  const computeBudgetIx = getSetComputeUnitLimitInstruction({
    units: simulation.units || 1_400_000
  });

  const priorityFeeIx = getSetComputeUnitPriceInstruction({
    microLamports: priorityFee
  });

  return [computeBudgetIx, priorityFeeIx, ...instructions];
} 
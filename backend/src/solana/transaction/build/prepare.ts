import { address } from '@solana/addresses';
import { pipe } from '@solana/functional';
import { 
  createTransactionMessage,
  setTransactionMessageFeePayer, 
  appendTransactionMessageInstructions,
  setTransactionMessageLifetimeUsingBlockhash,
  compileTransaction, 
  getBase64EncodedWireTransaction,
  type IInstruction,
  Base64EncodedWireTransaction,
  AddressesByLookupTableAddress,
  compressTransactionMessageUsingAddressLookupTables
} from '@solana/web3.js';
import { 
  getSetComputeUnitLimitInstruction,
  getSetComputeUnitPriceInstruction 
} from '@solana-program/compute-budget';
import { rpc } from '../../rpc';
import ky from 'ky';

export const PRIORITY_LEVELS = {
  MIN: "Min",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  VERY_HIGH: "VeryHigh",
  UNSAFE_MAX: "UnsafeMax"
} as const;

export type PriorityLevel = keyof typeof PRIORITY_LEVELS;

interface PriorityFeeOptions {
  priorityLevel?: PriorityLevel;
  lookbackSlots?: number;
  includeVote?: boolean;
  recommended?: boolean;
  evaluateEmptySlotAsZero?: boolean;
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

const DEFAULT_COMPUTE_UNITS = 1_400_000;
const DEFAULT_PRIORITY_FEE = 10000;

async function getComputeUnits(wireTransaction: Base64EncodedWireTransaction): Promise<number> {
  try {
    const simulation = await rpc.simulateTransaction(wireTransaction, {
      replaceRecentBlockhash: true,
      sigVerify: false,
      encoding: 'base64'
    }).send();

    console.log(simulation.value.logs)
    if (simulation.value.err) {
      console.log('Simulation error:', JSON.stringify(simulation.value.err));
      return DEFAULT_COMPUTE_UNITS;
    }

    const computeUnits = Number(simulation.value.unitsConsumed) || DEFAULT_COMPUTE_UNITS;
    console.log('Simulation units:', computeUnits);
    return computeUnits;
  } catch (error) {
    console.error('Error simulating transaction:', error);
    return DEFAULT_COMPUTE_UNITS;
  }
}

async function getPriorityFeeEstimate(
  wireTransaction: string,
  options: PriorityFeeOptions = {}
): Promise<number> {
  try {
    const data = await ky.post(`https://mainnet.helius-rpc.com/?api-key=${process.env.RPC_KEY!}`, {
      json: {
        jsonrpc: '2.0',
        id: '1',
        method: 'getPriorityFeeEstimate',
        params: [{          
          transaction: wireTransaction,
          options: {
            recommended: true,
            transactionEncoding: 'base64'
          }}]
      }
    }).json<PriorityFeeResponse>();
    
    if (!data.result?.priorityFeeEstimate) {
      console.error('Invalid priority fee response');
      return DEFAULT_PRIORITY_FEE;
    }

    return Math.max(data.result.priorityFeeEstimate, DEFAULT_PRIORITY_FEE);
  } catch (error) {
    console.error('Error getting priority fee estimate:', error);
    return DEFAULT_PRIORITY_FEE;
  }
}

export async function prepareComputeBudget(
  instructions: IInstruction<string>[],
  payerAddress: string,
  lookupTableAccounts: AddressesByLookupTableAddress,
  priorityLevel?: PriorityLevel
): Promise<IInstruction<string>[]> {
  try {
    const payer = address(payerAddress);
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    
    const message = pipe(
      createTransactionMessage({ version: 0 }),
      tx => setTransactionMessageFeePayer(payer, tx),
      tx => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      tx => appendTransactionMessageInstructions(instructions, tx)
    );

    const messageWithLookupTables = compressTransactionMessageUsingAddressLookupTables(message, lookupTableAccounts);
    const compiledMessage = compileTransaction(messageWithLookupTables);
    const wireTransaction = getBase64EncodedWireTransaction(compiledMessage);

    // Get compute units and priority fee in parallel
    const [computeUnits, priorityFee] = await Promise.all([
      getComputeUnits(wireTransaction),
      getPriorityFeeEstimate(wireTransaction, {
        priorityLevel,
        lookbackSlots: 150,
        includeVote: false,
        evaluateEmptySlotAsZero: true
      })
    ]);

    console.log('Priority fee:', priorityFee);
    
    // Create compute budget instructions
    const computeBudgetIx = getSetComputeUnitLimitInstruction({
      units: computeUnits * 1.1
    });

    const priorityFeeIx = getSetComputeUnitPriceInstruction({
      microLamports: priorityFee
    });

    return [computeBudgetIx, priorityFeeIx, ...instructions];
  } catch (error) {
    console.error('Error in prepareComputeBudget:', error);
    // Return default compute budget instructions if something goes wrong
    return [
      getSetComputeUnitLimitInstruction({ units: DEFAULT_COMPUTE_UNITS }),
      getSetComputeUnitPriceInstruction({ microLamports: DEFAULT_PRIORITY_FEE }),
      ...instructions
    ];
  }
} 
import { Address } from '@solana/web3.js';

export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";

export type BaseTransactionData = {
  signer: Address;
  priorityLevel?: PriorityLevel;
};

export type TransferData = BaseTransactionData & {
  type: 'transfer';
  to: Address;
  amount: number;
};

export type SwapData = BaseTransactionData & {
  type: 'swap';
  inputToken: string;
  outputToken: string;
  amount: number;
  slippageBps: number;
};

export type TransactionData = TransferData | SwapData;

export type SimulationResult = {
  units: number;
  error?: string;
}; 

export interface SwapInstruction {
  programId: string;
  accounts: Array<{
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
  }>;
  data: string;
}

export interface JupiterSwapInstructions {
  tokenLedgerInstruction?: SwapInstruction;
  computeBudgetInstructions: SwapInstruction[];
  setupInstructions: SwapInstruction[];
  swapInstruction: SwapInstruction;
  cleanupInstruction?: SwapInstruction;
  addressLookupTableAddresses: string[];
} 

export interface RawInstruction {
  programId: string;
  accounts: Array<{
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
  }>;
  data: string;
} 
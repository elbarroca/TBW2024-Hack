import { address } from '@solana/addresses';
import { type IInstruction, type IAccountMeta, type Address, AccountRole } from '@solana/web3.js';
import { getTransferSolInstruction } from '@solana-program/system';
import { createNoopSigner } from '@solana/signers';
import { TransactionData, RawInstruction } from '../types';
import { buildJupiterInstructions } from './jupiter';

// TODO: if something fails is this assertion
export function deserializeInstruction(instructionData: string): IInstruction<string> {
  const instruction = JSON.parse(instructionData) as RawInstruction;
  return {
    programAddress: instruction.programId as Address<string>,
    accounts: instruction.accounts.map((key) => ({
      address: key.pubkey as Address<string>,
      role: key.isSigner 
        ? (key.isWritable ? AccountRole.WRITABLE_SIGNER : AccountRole.READONLY_SIGNER)
        : (key.isWritable ? AccountRole.WRITABLE : AccountRole.READONLY)
    } satisfies IAccountMeta<string>)),
    data: Buffer.from(instruction.data, "base64")
  };
}

export async function getTransactionInstructions(data: TransactionData): Promise<IInstruction<string>[]> {
  const signer = createNoopSigner(address(data.signer));

  switch (data.type) {
    case 'transfer': {
      return [getTransferSolInstruction({
        amount: BigInt(Math.floor(data.amount * 1e9)),
        destination: data.to,
        source: signer
      })];
    }
    case 'swap': {
      return buildJupiterInstructions(
        data.inputToken,
        data.outputToken,
        data.amount,
        data.slippageBps,
        data.signer
      );
    }
    default:
      throw new Error('Unsupported transaction type');
  }
}
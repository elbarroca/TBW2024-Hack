import { getTransferSolInstruction } from "@solana-program/system";
import { 
  Address, 
  getAddressEncoder, 
  getProgramDerivedAddress, 
  IInstruction, 
  NoopSigner, 
  TransactionSigner,
} from "@solana/web3.js";
import { getTransferCheckedInstruction, getCreateAssociatedTokenIdempotentInstruction } from "@solana-program/token";
import { SOL_MINT } from "../../../lib/constants";
import { rpc } from "../../rpc";
import { BigNumber } from "bignumber.js";

const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address;
const ASSOCIATED_TOKEN_PROGRAM_ID = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address;
const addressEncoder = getAddressEncoder();

async function checkIfTokenAccountExists(address: Address): Promise<boolean> {
  try {
    const account = await rpc.getAccountInfo(address).send();
    return account.value !== null;
  } catch {
    return false;
  }
}

function buildSolTransferInstruction(
  from: TransactionSigner,
  to: Address,
  amount: bigint
): IInstruction<string> {
  return getTransferSolInstruction({
    amount,
    destination: to,
    source: from
  });
}

function buildTokenTransferInstruction(
  signer: TransactionSigner,
  source: Address,
  to: Address,
  amount: bigint,
  mint: Address,
  decimals: number
): IInstruction<string> {
  return getTransferCheckedInstruction({
    amount,
    destination: to,
    authority: signer,
    mint,
    source,
    decimals
  });
}

export async function buildTransferInstruction(
  from: NoopSigner<string>,
  to: Address,
  amount: number,
  mint: Address,
  decimals: number
): Promise<IInstruction<string>[]> {
  const amountBigInt = BigInt(amount);

  if (mint === SOL_MINT) {
    return [buildSolTransferInstruction(from, to, amountBigInt)];
  }

  const instructions: IInstruction<string>[] = [];
  const sourceATA = await getProgramDerivedAddress({
    programAddress: ASSOCIATED_TOKEN_PROGRAM_ID,
    seeds: [
      addressEncoder.encode(from.address),
      addressEncoder.encode(TOKEN_PROGRAM_ID),
      addressEncoder.encode(mint)
    ]
  });

  const destinationATA = await getProgramDerivedAddress({
    programAddress: ASSOCIATED_TOKEN_PROGRAM_ID,
    seeds: [
      addressEncoder.encode(to),
      addressEncoder.encode(TOKEN_PROGRAM_ID),
      addressEncoder.encode(mint)
    ]
  });

  // Check if destination ATA exists
  const destinationExists = await checkIfTokenAccountExists(destinationATA[0]);
  if (!destinationExists) {
    instructions.push(
      getCreateAssociatedTokenIdempotentInstruction({
        payer: from,
        mint,
        owner: to,
        ata: destinationATA[0],
      })
    );
  }

  instructions.push(
    buildTokenTransferInstruction(
      from,
      sourceATA[0],
      destinationATA[0],
      amountBigInt,
      mint,
      decimals
    )
  );

  return instructions;
}
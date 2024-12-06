import { address } from "@solana/addresses";
import { decodeMint, type Mint } from "@solana-program/token";
import { rpc } from "../rpc";
import type { EncodedAccount } from "@solana/accounts";
import { ReadonlyUint8Array } from "@solana/web3.js";
import type { Base64EncodedDataResponse } from "@solana/rpc-types";

export type DecodedMint = {
  mintAuthorityOption: number;
  mintAuthority: string;
  supply: string;
  decimals: number;
  isInitialized: boolean;
  freezeAuthorityOption: number;
  freezeAuthority: string;
};

export async function getMints(mints: string[]): Promise<Record<string, DecodedMint>> {
  if (mints.length === 0) return {};

  const mintAddresses = mints.map(mint => address(mint));
  const { value: mintsResponse } = await rpc.getMultipleAccounts(
    mintAddresses,
    { encoding: 'base64' }
  ).send();

  return mintsResponse.reduce((acc, mint, index) => {
    if (!mint?.data) return acc;

    const [base64Data] = mint.data as Base64EncodedDataResponse;
    const rawData = Buffer.from(base64Data, 'base64');
    const mintAddress = mintAddresses[index];

    const encodedAccount: EncodedAccount<string> = {
      address: mintAddress,
      data: new Uint8Array(rawData) as ReadonlyUint8Array,
      executable: mint.executable,
      lamports: mint.lamports,
      programAddress: mint.owner,
    };

    const decodedMintData = decodeMint(encodedAccount);
    
    acc[mintAddress.toString()] = {
      mintAuthorityOption: decodedMintData.data.mintAuthority ? 1 : 0,
      mintAuthority: decodedMintData.data.mintAuthority?.toString() || '',
      supply: decodedMintData.data.supply.toString(),
      decimals: decodedMintData.data.decimals,
      isInitialized: decodedMintData.data.isInitialized,
      freezeAuthorityOption: decodedMintData.data.freezeAuthority ? 1 : 0,
      freezeAuthority: decodedMintData.data.freezeAuthority?.toString() || '',
    };

    return acc;
  }, {} as Record<string, DecodedMint>);
}
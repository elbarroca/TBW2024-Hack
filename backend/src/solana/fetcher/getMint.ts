import { address } from "@solana/addresses";
import { MintLayout, RawMint } from "@solana/spl-token";
import { config } from "../../lib/config";
import { Base64EncodedDataResponse } from "@solana/rpc-types";
import { rpc } from "../rpc";

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
    const decodedData = Buffer.from(base64Data, 'base64');
    const decodedMintData = MintLayout.decode(decodedData) as RawMint;
    const mintAddress = mintAddresses[index].toString();
    
    acc[mintAddress] = {
      mintAuthorityOption: decodedMintData.mintAuthorityOption,
      mintAuthority: decodedMintData.mintAuthority.toString(),
      supply: decodedMintData.supply.toString(),
      decimals: decodedMintData.decimals,
      isInitialized: decodedMintData.isInitialized,
      freezeAuthorityOption: decodedMintData.freezeAuthorityOption,
      freezeAuthority: decodedMintData.freezeAuthority.toString(),
    };

    return acc;
  }, {} as Record<string, DecodedMint>);
}
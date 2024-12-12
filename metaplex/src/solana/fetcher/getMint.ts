import { PublicKey } from "@solana/web3.js";
import { config } from "../../config";
import { MintLayout, RawMint } from "@solana/spl-token";
import ky from "ky";

export type DecodedMint = {
  mintAuthorityOption: number;
  mintAuthority: string;
  supply: string;
  decimals: number;
  isInitialized: boolean;
  freezeAuthorityOption: number;
  freezeAuthority: string;
};  

export async function getMints(mints: PublicKey[]): Promise<Record<string, DecodedMint>> {
    if (mints.length === 0) return {};
  
    const mintsResponse =
      await config.RPC.getMultipleAccountsInfo(mints);
  
    const newMintData: Record<string, DecodedMint> = {};

    await Promise.all(
      mintsResponse.map(async (mint, index) => {
        if (mint && mint.data) {
          const decodedMintData = MintLayout.decode(mint.data) as RawMint;
          const mintAddress = mints[index].toBase58();
          const mintData = {
            mint: mintAddress,
            mintAuthorityOption: decodedMintData.mintAuthorityOption,
            mintAuthority: decodedMintData.mintAuthority.toBase58(),
            supply: decodedMintData.supply.toString(),
            decimals: decodedMintData.decimals,
            isInitialized: decodedMintData.isInitialized,
            freezeAuthorityOption: decodedMintData.freezeAuthorityOption,
            freezeAuthority: decodedMintData.freezeAuthority.toBase58(),
          };
          newMintData[mintAddress] = mintData;
        }
      }),
    );
  
    return newMintData;
  }
    
export async function getTokenInfo(mint: string) {
    return await ky
      .get(`https://tokens.jup.ag/token/${mint}`)
      .json<JupTokenInfo>();
}

export type JupTokenInfo = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
    tags: string[];
    daily_volume: number;
};
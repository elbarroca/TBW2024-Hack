import ky from "ky";

export type TokenMetadata = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  tags: string[];
  daily_volume: number;
};

export async function getTokenMetadata(mint: string) {
    return await ky
      .get(`https://tokens.jup.ag/token/${mint}`)
      .json<TokenMetadata>();
  }
  

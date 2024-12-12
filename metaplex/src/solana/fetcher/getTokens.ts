import { PublicKey } from "@solana/web3.js";
import { getMints, getTokenInfo, JupTokenInfo } from "./getMint";
import { getTokenAccounts } from "./getTokenAccounts";
import BigNumber from "bignumber.js";
import { getPrices } from "./getPrices";
import { config } from "../../config";
import { decimalsFromSymbol, mintFromSymbol } from "../../constants";

export type TokenInfo = {
  mint: string;
  address: string;
  amount: string;
  value: string;
  decimals: number;
  metadata: JupTokenInfo;
};

export async function getTokens(userKey: string): Promise<TokenInfo[]> {
  const threshold = new BigNumber(10);

    const tokenAccounts = await getTokenAccounts(userKey);
    const [mints, prices] = await Promise.all([
      getMints(tokenAccounts.map((x) => new PublicKey(x.pubkey))),
      getPrices(tokenAccounts.map((x) => x.pubkey)),
    ]);
  
    const tokens = await Promise.all(
      tokenAccounts.map(async (accountData) => {
        try {
          const mint = accountData.data.mint.toBase58();
          const mintData = mints[mint];
          const amount = accountData.data.amount.dividedBy(
            new BigNumber(10).pow(mintData.decimals),
          );
  
          const price = prices.data[mint].price;
          const totalValue = amount.multipliedBy(new BigNumber(price));
          if (totalValue.isLessThan(threshold)) return null;
  
          const metadata = await getTokenInfo(mint);
          return {
            mint,
            address: accountData.pubkey,
            amount: amount.toFixed(2),
            value: threshold.dividedBy(price).toFixed(2).toString(),
            decimals: mintData.decimals,
            metadata,
          } as TokenInfo;
        } catch (e: any) {
          return null;
        }
      }),
    );
  
    const filteredTokens = tokens.filter(
      (token) => token !== null,
    ) as TokenInfo[];
  
    const solMint = mintFromSymbol["SOL"];
    const solDecimals = decimalsFromSymbol["SOL"];
    const solBalance = await config.RPC.getBalance(new PublicKey(userKey));
    const solAmount = new BigNumber(solBalance).dividedBy(
      new BigNumber(10).pow(solDecimals),
    );
    const price = await getPrices([solMint]);
    if (price) {
      const priceBN = new BigNumber(price.data[solMint].price);
      const totalValue = solAmount.multipliedBy(priceBN);
      if (totalValue.isGreaterThan(threshold)) {
        const metadata = await getTokenInfo(solMint);

        filteredTokens.push({
          mint: solMint,
          address: userKey,
          amount: solAmount.toString(),
          value: threshold.dividedBy(priceBN).toFixed(2).toString(),
          decimals: solDecimals,
          metadata,
        });
      }
    }
  
    return filteredTokens;
  }
import BigNumber from "bignumber.js";
import { TokenAmount } from "@solana/rpc-types";
import { Address } from "@solana/addresses";
import { rpc } from "../rpc";
import { fetchTokensData } from "./birdeye";
import { getTokenAccounts } from "./getTokenAccounts";

export type TokenInfo = {
  mint: string;
  address: string;
  amount: string;
  uiAmountString: string;
  value: string;
  decimals: number;
  metadata: {
    symbol: string;
    name: string;
    image: string;
  };
};

const THRESHOLD_VALUE_USD = new BigNumber(0.1);

export async function getTokens(userKey: string): Promise<TokenInfo[]> {
  try {
    const tokenAccounts = await getTokenAccounts(userKey as Address);
    const nonZeroAccounts = tokenAccounts.filter(account => 
      account.account.tokenAmount.amount !== '0'
    );

    if (nonZeroAccounts.length === 0) return [];

    // Get all mint addresses including SOL
    const mintAddresses = [
      "So11111111111111111111111111111111111111112",
      ...nonZeroAccounts.map(account => account.account.mint.toString())
    ];

    // Fetch all data from Birdeye in one go
    const { metadata, marketData } = await fetchTokensData(mintAddresses);
    const tokens: TokenInfo[] = [];

    // Process SOL balance
    try {
      const solBalance = (await rpc.getBalance(userKey as Address).send()).value;
      const solAmount = new BigNumber(solBalance.toString()).dividedBy(new BigNumber(1000000000));
      const solPrice = marketData["So11111111111111111111111111111111111111112"]?.price || 0;
      const solValue = solAmount.multipliedBy(solPrice);
      const solMetadata = metadata["So11111111111111111111111111111111111111112"];

      if (solValue.isGreaterThanOrEqualTo(THRESHOLD_VALUE_USD) && solMetadata) {
        tokens.push({
          mint: "So11111111111111111111111111111111111111112",
          address: userKey,
          amount: solAmount.toString(),
          uiAmountString: solAmount.toFixed(2),
          value: solValue.toFixed(2),
          decimals: 9,
          metadata: {
            symbol: solMetadata.symbol,
            name: solMetadata.name,
            image: solMetadata.logo_uri
          }
        });
      }
    } catch (error) {
      console.error("Error processing SOL balance:", error);
    }

    // Process other tokens
    for (const { pubkey, account } of nonZeroAccounts) {
      const tokenMetadata = metadata[account.mint.toString()];
      const tokenMarketData = marketData[account.mint.toString()];

      if (!tokenMetadata || !tokenMarketData) continue;

      const value = calculateValue(
        account.tokenAmount,
        tokenMetadata.decimals,
        tokenMarketData.price
      );

      if (value.isLessThan(THRESHOLD_VALUE_USD)) continue;

      tokens.push({
        mint: account.mint.toString(),
        address: pubkey.toString(),
        amount: account.tokenAmount.amount || '0',
        uiAmountString: account.tokenAmount.uiAmountString || '0',
        value: value.toFixed(2),
        decimals: tokenMetadata.decimals,
        metadata: {
          symbol: tokenMetadata.symbol,
          name: tokenMetadata.name,
          image: tokenMetadata.logo_uri
        }
      });
    }

    return tokens;

  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
}

function calculateValue(tokenAmount: TokenAmount, decimals: number, price: number): BigNumber {
  try {
    const amount = new BigNumber(tokenAmount.amount);
    const decimalAdjustment = new BigNumber(10).pow(decimals);
    const adjustedAmount = amount.dividedBy(decimalAdjustment);
    return adjustedAmount.multipliedBy(price);
  } catch (error) {
    console.error('Error calculating value:', error);
    return new BigNumber(0);
  }
}
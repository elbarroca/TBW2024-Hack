import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { AccountLayout } from "@solana/spl-token";
import { config } from "../../config";
import { PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";

export async function getTokenAccounts(userKey: string) {
    const publicKey = new PublicKey(userKey);
    const tokenAccounts = await config.RPC.getTokenAccountsByOwner(
      publicKey,
      { programId: TOKEN_PROGRAM_ID },
    );
  
    const accountDatas = tokenAccounts.value.map((account) => ({
      pubkey: account.pubkey.toBase58(),
      data: AccountLayout.decode(account.account.data),
    }));
  
    return accountDatas
      .map((x) => ({
        ...x,
        data: {
          ...x.data,
          amount: new BigNumber(x.data.amount.toString()),
        },
      }))
      .filter((x) => x.data.amount.isGreaterThan(0));
}
import { Elysia, t } from "elysia";
import { config } from "../lib/config";
import { address } from "@solana/addresses";
import { getTokens } from "../solana/fetcher/getTokens";
import { sendTransaction } from "../solana/sendTransaction";
import { validateTransaction } from "../solana/validateTransction";


interface GetBalancesQuery {
  user: string;
}

const getBalancesQuerySchema = t.Object({
  user: t.String(),
});

export const solanaManager = new Elysia()
  .get(
    "/getBalances",
    async ({ query }: { query: GetBalancesQuery }) => {
      try {
        const userPubkey = address(query.user);
        const { value: userInfo } = await config.RPC.getAccountInfo(userPubkey).send();
        if (!userInfo)
          return {
            error: "Ensure you have SOL on your wallet",
            status: 404,
          };
      
        const balances = await getTokens(userPubkey);

        return { balances, status: 200 };
      } catch (e: any) {
        console.error(e.message);
        return { error: e.message, status: 500 };
      }
    },
    {
      query: getBalancesQuerySchema,
    },
  )

  .post(
    "/sendTransaction",
    async ({ body }: { body: { transaction: string } }) => {
      try {
        const signature = await sendTransaction(body.transaction);
        validateTransaction(signature); // dont await this

        return { signature, status: 200 };
      } catch (error: any) {
        console.error("Error sending transaction:", error);
        return { error: error.message, status: 500 };
      }
    },
  )
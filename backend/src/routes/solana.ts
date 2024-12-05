import { Elysia, t } from "elysia";
import { config } from "../lib/config";
import { address } from "@solana/addresses";
import { getTokens } from "../solana/fetcher/getTokens";
import { sendTransaction } from "../solana/transaction/send";
import { validateTransaction } from "../solana/transaction/validate";
import { getTransactions } from "../solana/fetcher/getTransactions";
import { buildTransaction } from "../solana/transaction/build/buildTransaction";
import { rpc } from "../solana/rpc";

interface GetBalancesQuery {
  user: string;
}

const getBalancesQuerySchema = t.Object({
  user: t.String(),
});

export const solanaManager = new Elysia({ prefix: '/solana' })
  .get(
    "/getBalances",
    async ({ query }: { query: GetBalancesQuery }) => {
      try {
        const userPubkey = address(query.user);
        const { value: userInfo } = await rpc.getAccountInfo(userPubkey).send();
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

  .get(
    "/getTransactions",
    async ({ query }: { query: any }) => {
      try {
        const transactions = await getTransactions(query.address);

        return { transactions, status: 200 };
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
    "/buildTransaction",
    async ({ body }: { body: { transaction: string } }) => {
      try { 
        const parsedTx = JSON.parse(body.transaction);
        const transactionToSign = await buildTransaction(parsedTx);

        return { transaction: transactionToSign, status: 200 };
      } catch (error: any) {
        console.error("Error building transaction:", error);
        return { error: error.message, status: 500 };
      }
    },
  )

  .post(
    "/sendTransaction",
    async ({ body }: { 
      body: { 
        transaction: string;
        userId: string;
        courseId: string;
      } 
    }) => {
      try {
        const txSignature = await sendTransaction(body.transaction);

        // Validate asynchronously - don't await
        validateTransaction(
          txSignature,
          body.userId,
          body.courseId
        ).catch(error => {
          console.error("Validation error:", error);
        });

        return { signature: txSignature, status: 200 };
      } catch (error: any) {
        console.error("Error sending transaction:", error);
        return { error: error.message, status: 500 };
      }
    },
    {
      body: t.Object({
        transaction: t.String(),
        userId: t.String(),
        courseId: t.String()
      })
    }
  )
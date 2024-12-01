import { Keypair, VersionedTransaction } from "@solana/web3.js";
import { config } from "../src/lib/config";
import {
  initializeMangoClient,
  getMangoGroup,
  getMangoClient,
} from "../src/mango";
import { USDC_MINT } from "../src/lib/constants";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

const SERVER_URL = "http://localhost:3000";

async function testWithdrawSDK() {
  await initializeMangoClient();

  const secret = JSON.parse(process.env.SECRET || "");
  if (secret === "")
    throw new Error("Secret not found in environment variables.");
  const secretUint8Array = new Uint8Array(secret);
  const signer = Keypair.fromSecretKey(secretUint8Array);
  const ownerPublicKey = signer.publicKey;

  const mangoClient = getMangoClient();
  const mangoGroup = getMangoGroup();

  try {
    console.log("Fetching Mango accounts for owner", ownerPublicKey.toBase58());

    const mangoAccounts = await mangoClient.getMangoAccountsForOwner(
      mangoGroup,
      ownerPublicKey,
    );

    console.log("Found", mangoAccounts.length, "mango accounts");
    for (const mangoAccount of mangoAccounts) {
      console.log(
        `\nProcessing Mango account: ${mangoAccount.publicKey.toBase58()}`,
      );

      const bank = mangoGroup.getFirstBankByMint(USDC_MINT);
      const tokenBalance = mangoAccount.getTokenBalance(bank);
      const withdrawAmount = tokenBalance.toNumber();

      if (withdrawAmount <= 0) {
        console.log("Insufficient balance to withdraw. Skipping...");
        continue;
      }

      console.log(`Withdrawing ${withdrawAmount / 1e6} USDC`);

      const withdrawResponse = await fetch(`${SERVER_URL}/withdraw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner: ownerPublicKey.toBase58(),
          botId: mangoAccount.accountNum,
        }),
      }).then((res) => res.json());

      if (withdrawResponse.status === 200) {
        const transaction = VersionedTransaction.deserialize(
          Buffer.from(withdrawResponse.transaction, "base64"),
        );
        transaction.sign([signer]);
        const serializedTransaction = Buffer.from(
          transaction.serialize(),
        ).toString("base64");

        const withdrawTxResponse = await fetch(
          `${SERVER_URL}/sendTransaction`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transaction: serializedTransaction }),
          },
        ).then((res) => res.json());

        console.log("Withdraw transaction result:", withdrawTxResponse);

        if (withdrawTxResponse.status === 200) {
          console.log("Withdrawal successful.");
        } else {
          console.log("Withdrawal failed.");
        }
      } else {
        console.log("Failed to create withdrawal transaction.");
      }
    }

    // Check final balance
    const tokenAccount = getAssociatedTokenAddressSync(
      USDC_MINT,
      ownerPublicKey,
    );
    const balance = await config.RPC.getTokenAccountBalance(tokenAccount);
    console.log("Final USDC balance:", balance.value.uiAmount);
  } catch (error) {
    console.error("Error:", error);
  }
}

testWithdrawSDK().catch(console.error);

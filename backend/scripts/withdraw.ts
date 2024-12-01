import { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { config } from "../src/lib/config";
import { initializeMangoClient } from "../src/mango";
import { USDC_MINT } from "../src/lib/constants";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

const SERVER_URL = "http://localhost:3000";

async function withdrawBot() {
  await initializeMangoClient();

  const secret = JSON.parse(process.env.SECRET || "");
  if (secret === "")
    throw new Error("Secret not found in environment variables.");
  const secretUint8Array = new Uint8Array(secret);
  const signer = Keypair.fromSecretKey(secretUint8Array);
  const ownerPublicKey = signer.publicKey.toBase58();

  const botId = 1;

  try {
    console.log("Withdrawing bot", botId, "for owner", ownerPublicKey);

    const withdrawResponse = await fetch(`${SERVER_URL}/withdraw`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner: ownerPublicKey,
        botId: 15,
      }),
    }).then((res) => res.json());

    console.log("Withdraw response:", withdrawResponse);

    if (withdrawResponse.status === 200) {
      const transaction = VersionedTransaction.deserialize(
        Buffer.from(withdrawResponse.transaction, "base64"),
      );
      transaction.sign([signer]);
      const serializedTransaction = Buffer.from(
        transaction.serialize(),
      ).toString("base64");

      const withdrawTxResponse = await fetch(`${SERVER_URL}/sendTransaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transaction: serializedTransaction }),
      }).then((res) => res.json());

      console.log("Withdraw transaction result:", withdrawTxResponse);

      if (withdrawTxResponse.status === 200) {
        console.log("Withdrawal successful. Deactivating bot in database...");
        console.log("Bot", botId, "deactivated in database.");
      } else {
        console.log(
          "Withdrawal failed. Bot",
          botId,
          "remains active in database.",
        );
      }
    } else {
      console.log("Failed to create withdrawal transaction for bot ", botId);
    }

    // Check final balance
    const tokenAccount = getAssociatedTokenAddressSync(
      new PublicKey(USDC_MINT),
      signer.publicKey,
    );
    const balance = await config.RPC.getTokenAccountBalance(tokenAccount);
    console.log("Final USDC balance:", balance.value.uiAmount);
  } catch (error) {
    console.error("Error:", error);
  }
}

withdrawBot().catch(console.error);

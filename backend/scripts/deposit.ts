import { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { initializeMangoClient } from "../src/mango";

const SERVER_URL = "http://localhost:3000";

async function testCreateAccount() {
  await initializeMangoClient();

  const secret = JSON.parse(process.env.SECRET || "");
  if (secret === "")
    throw new Error("Secret not found in environment variables.");
  const secretUint8Array = new Uint8Array(secret);
  const signer = Keypair.fromSecretKey(secretUint8Array);
  const ownerPublicKey = signer.publicKey.toBase58();
  const delegate = "rikiFB2VznT2izUT7UffzWCn1X4gNmGutX7XEqFdpRR";

  try {
    console.log("Testing account creation for owner", ownerPublicKey);

    const createAccountResponse = await fetch(`${SERVER_URL}/deposit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner: ownerPublicKey,
        delegate,
        amount: 100000,
      }),
    }).then((res) => res.json());

    console.log("Create account response:", createAccountResponse);

    if (createAccountResponse.status === 200) {
      const transaction = VersionedTransaction.deserialize(
        Buffer.from(createAccountResponse.transaction, "base64"),
      );
      transaction.sign([signer]);
      const serializedTransaction = Buffer.from(
        transaction.serialize(),
      ).toString("base64");

      const createAccountTxResponse = await fetch(
        `${SERVER_URL}/sendTransaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transaction: serializedTransaction }),
        },
      ).then((res) => res.json());

      console.log(
        "Create account transaction result:",
        createAccountTxResponse,
      );

      if (createAccountTxResponse.status === 200) {
        console.log("Account creation successful.");
        console.log("Bot ID:", createAccountResponse.botId);
        console.log(
          "Mango Account Address:",
          createAccountResponse.mangoAccountAddress,
        );
      } else {
        console.log("Account creation transaction failed.");
      }
    } else {
      console.log("Failed to create account transaction.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

testCreateAccount().catch(console.error);

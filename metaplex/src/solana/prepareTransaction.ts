import { 
  TransactionInstruction, 
  PublicKey, 
  ComputeBudgetProgram, 
  TransactionMessage, 
  VersionedTransaction,
  SimulateTransactionConfig,
} from "@solana/web3.js";
import { config } from "../config";
import bs58 from "bs58";

const MAX_COMPUTE_UNITS = 1_400_000;
const MIN_LAMPORTS_PER_CU = 10_000;
const MAX_LAMPORTS_PER_CU = 50_000;

async function getComputeUnits(
  instructions: TransactionInstruction[],
  payer: PublicKey
): Promise<{ units: number; error?: string }> {  
  const tempComputeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit({
    units: MAX_COMPUTE_UNITS,
  });
  
  const tempComputePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: MIN_LAMPORTS_PER_CU,
  });
  
  const allInstructions = [tempComputePriceIx, tempComputeBudgetIx, ...instructions];

  const message = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: PublicKey.default.toBase58(),
    instructions: allInstructions,
  }).compileToV0Message();

  const transaction = new VersionedTransaction(message);

  const simulateConfig: SimulateTransactionConfig = {
    replaceRecentBlockhash: true,
    sigVerify: false,
    commitment: "confirmed",
  };

  try {
    const simulation = await config.RPC.simulateTransaction(transaction, simulateConfig);

    if (simulation.value.err) {
      console.error("Simulation error:", JSON.stringify(simulation.value.err, null, 2));
      console.log("Simulation logs:", simulation.value.logs);
      return { units: 0, error: JSON.stringify(simulation.value.err) };
    }

    const units = simulation.value.unitsConsumed || 0;
    return { units: Math.ceil(units * 1.1) };

  } catch (error: any) {
    console.error("Error during simulation:", error);
    return { units: 0, error: error.toString() };
  }
}

async function getPriorityFeeEstimate(
  priorityLevel: string, 
  instructions: TransactionInstruction[], 
  payerKey: PublicKey, 
  recentBlockhash: string
): Promise<number> {
  const message = new TransactionMessage({
    payerKey,
    recentBlockhash,
    instructions,
  }).compileToV0Message();
  
  const transaction = new VersionedTransaction(message);

  try {
    const response = await fetch(config.RPC.rpcEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "1",
        method: "getPriorityFeeEstimate",
        params: [
          {
            transaction: bs58.encode(transaction.serialize()),
            options: { priorityLevel },
          },
        ],
      }),
    });
    const data = await response.json();
    if (data.error) {
      console.error("Priority fee estimate error:", data.error);
      return MIN_LAMPORTS_PER_CU;
    }
    return Number(data.result.priorityFeeEstimate);
  } catch (error) {
    console.error("Error getting priority fee estimate:", error);
    return MIN_LAMPORTS_PER_CU;
  }
}

export async function prepareTransaction(instructions: TransactionInstruction[], payerKey: PublicKey): Promise<string> {    
  const recentBlockhash = await config.RPC.getLatestBlockhash('finalized')
    .then(res => res.blockhash)
    .catch(err => {
      console.error("Error getting recent blockhash:", err);
      throw new Error("Failed to get recent blockhash");
    });
  
  const [computeUnitsResult, microLamports] = await Promise.all([
    getComputeUnits(instructions, payerKey),
    getPriorityFeeEstimate('High', instructions, payerKey, recentBlockhash)
  ]);

  if (computeUnitsResult.error) {
    console.error(`Simulation error: ${computeUnitsResult.error}`);
    throw new Error(`Simulation error: ${computeUnitsResult.error}`);
  }

  const units = computeUnitsResult.units;
  console.log('units', units);
  if (units === 0) throw new Error("Failed to estimate compute units");
  
  const lamportsPerCu = Math.min(Math.max(microLamports, MIN_LAMPORTS_PER_CU), MAX_LAMPORTS_PER_CU);
  console.log(`Priority fee estimate: ${lamportsPerCu} lamports per CU`);

  const computePriceInstruction = ComputeBudgetProgram.setComputeUnitPrice({ microLamports: MAX_LAMPORTS_PER_CU });
  const computeBudgetInstruction = ComputeBudgetProgram.setComputeUnitLimit({ units });
  const allInstructions = [computePriceInstruction, computeBudgetInstruction, ...instructions];

  const messageV0 = new TransactionMessage({
    payerKey,
    recentBlockhash,
    instructions: allInstructions,
  }).compileToV0Message();
  const transaction = new VersionedTransaction(messageV0);

  return Buffer.from(transaction.serialize()).toString('base64');
}
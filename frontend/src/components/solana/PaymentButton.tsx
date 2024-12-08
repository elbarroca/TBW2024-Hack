import { useBuildTransactionMutation, useSendTransactionMutation } from "@/api/endpoints/solana";
import { TokenInfo } from "@/types/api";
import { useSignTransaction } from "@solana/react";
import { UiWalletAccount } from "@wallet-standard/react";
import { useCallback } from "react";
import bs58 from 'bs58';
import { Button } from "@/components/ui/button";
import { getBase64Codec, getBase64Decoder, getBase64Encoder, getTransactionDecoder } from "@solana/web3.js";

interface PaymentProps {
    selectedToken: TokenInfo;
    amount: string;
    onSuccess: (signature: string) => void;
    onError: (error: string) => void;
}

interface BaseTransactionData {
    signer: string;
    priorityLevel?: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
}

interface TransferData extends BaseTransactionData {
    type: 'transfer';
    to: string;
    amount: number;
    mint: string;
}

interface SwapData extends BaseTransactionData {
    type: 'swap';
    inputToken: string;
    outputToken: string;
    amount: number;
    slippageBps: number;
    decimals: number;
}

type TransactionData = TransferData | SwapData;

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const COURSE_CREATOR_ADDRESS = "rikiFB2VznT2izUT7UffzWCn1X4gNmGutX7XEqFdpRR";
const USER_ID = "UUID1";
const COURSE_ID = "UUID2";

export function PaymentButton({ account, params }: { account: UiWalletAccount, params: PaymentProps }) {
    const signTransaction = useSignTransaction(account, 'solana:devnet');
    const [buildTransaction] = useBuildTransactionMutation();
    const [sendTransaction] = useSendTransactionMutation();

    const handleTransaction = useCallback(async () => {
        const { selectedToken, amount, onSuccess, onError } = params;
        try {
            const isUSDCPayment = selectedToken.mint === USDC_MINT;

            const transactionData: TransactionData = isUSDCPayment 
                ? {
                    type: 'transfer',
                    signer: account.address,
                    to: COURSE_CREATOR_ADDRESS,
                    amount: Number(amount),
                    mint: USDC_MINT,
                    priorityLevel: "MEDIUM"
                } 
                : {
                    type: 'swap',
                    signer: account.address,
                    inputToken: selectedToken.mint,
                    outputToken: USDC_MINT,
                    amount: Number(amount),
                    slippageBps: 100,
                    priorityLevel: "MEDIUM",
                    decimals: selectedToken.decimals
                };

            // Get transaction from backend
            const { transaction: base64Transaction } = await buildTransaction({
                transaction: JSON.stringify(transactionData)
            }).unwrap();


            if (!base64Transaction) {
                throw new Error("Failed to create transaction");
            }

            const base64Encoder = getBase64Encoder();
            const transactionBytes = base64Encoder.encode(base64Transaction);
    
            const { signedTransaction } = await signTransaction({
                transaction: transactionBytes as unknown as Uint8Array,
            });

            // Convert to base64 for sending
            const serializedTransaction = bs58.encode(Buffer.from(signedTransaction));

            // Send signed transaction
            const response = await sendTransaction({
                transaction: serializedTransaction,
                userId: USER_ID,
                courseId: COURSE_ID
            }).unwrap();

            onSuccess(response.signature);

        } catch (error) {
            console.error('Transaction error:', error);
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";
            onError(errorMessage);
            throw error;
        }
    }, [account, params, buildTransaction, sendTransaction, signTransaction]);

    return (
        <Button
            onClick={handleTransaction}
            className="w-full py-6 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
        >
            Confirm Payment
        </Button>
    );
}

function base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}
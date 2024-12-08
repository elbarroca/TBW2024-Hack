import { useBuildTransactionMutation, useSendTransactionMutation } from '@/api/endpoints/solana';
import { TokenInfo } from '@/types/api';
import { StandardConnect } from '@wallet-standard/core';
import { useWalletAccountTransactionSigner } from '@solana/react';
import { UiWallet, UiWalletAccount } from '@wallet-standard/react';
import { Address } from '@solana/addresses';
import { useAppSelector } from '@/store';
import { useCallback } from 'react';
import { type TransactionMessageBytes, type SignaturesMap } from '@solana/transactions';
import { SignatureBytes } from '@solana/keys';
import bs58 from 'bs58';
import { TransactionModifyingSigner } from '@solana/signers';

interface TransactionHandlerProps {
    selectedToken: TokenInfo;
    amount: string;
    onSuccess: () => void;
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

export function useTransaction() {
    const { wallet } = useAppSelector((state) => state.auth);
    if (!wallet) {
        throw new Error("Wallet not connected");
    }

    const { transactionSigner } = (wallet as any);
    const [buildTransaction] = useBuildTransactionMutation();
    const [sendTransaction] = useSendTransactionMutation();

    const handleTransaction = useCallback(async (params: TransactionHandlerProps) => {
        if (!wallet || !transactionSigner) {
            throw new Error("Wallet not connected or signer not available");
        }

        const { selectedToken, amount, onSuccess, onError } = params;
        const address = wallet.account;

        try {
            if (!wallet.features.includes(StandardConnect)) {
                throw new Error("Wallet not properly connected");
            }

            const isUSDCPayment = selectedToken.mint === USDC_MINT;
            const signerAddress = bs58.encode(Buffer.from(address));

            const transactionData: TransactionData = isUSDCPayment 
                ? {
                    type: 'transfer',
                    signer: signerAddress,
                    to: COURSE_CREATOR_ADDRESS,
                    amount: Number(amount),
                    mint: USDC_MINT,
                    priorityLevel: "MEDIUM"
                } 
                : {
                    type: 'swap',
                    signer: signerAddress,
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

            // Convert base64 to transaction bytes
            const transactionBuffer = Buffer.from(base64Transaction, 'base64');
            
            // Sign transaction
            const [signedTransaction] = await transactionSigner.modifyAndSignTransactions([
                {
                    // @ts-ignore
                    messageBytes: Uint8Array.from(transactionBuffer) as unknown as TransactionMessageBytes,
                    signatures: {} as Record<Address, SignatureBytes>
                }
            ]);

            // Get signature
            const [[_, signature]] = Object.entries(signedTransaction.signatures);
            if (!signature) {
                throw new Error('Failed to sign transaction');
            }

            // Convert to base64 for sending
            const serializedTransaction = bs58.encode(Buffer.from(signedTransaction.messageBytes));

            // Send signed transaction
            await sendTransaction({
                transaction: serializedTransaction,
                userId: USER_ID,
                courseId: COURSE_ID
            }).unwrap();

            onSuccess();
            return serializedTransaction;

        } catch (error) {
            console.error('Transaction error:', error);
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";
            onError(errorMessage);
            throw error;
        }
    }, [wallet, transactionSigner]);

    return { handleTransaction };
} 
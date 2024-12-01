export type User = {
    id: string;
    address: string;
    email?: string;
    username?: string;
    createdAt?: string;
    updatedAt?: string;
    preferences?: {
        notifications?: boolean;
        theme?: 'light' | 'dark' | 'system';
    };
    isActive?: boolean;
};

export type TokenInfo = {
    mint: string;
    address: string;
    amount: string;
    value: string;
    decimals: number;
    metadata: Metadata;
};

export type Metadata = {
    name: string;
    symbol: string;
    image: string;
};

export type TokenPrice = {
    id: string;
    mintSymbol: string;
    vsToken: string;
    vsTokenSymbol: string;
    price: number;
};

export type JupQuote = {
    data: {
        [key: string]: TokenPrice;
    };
    timeTaken: number;
};

export type Payment = {
    signature: string;
    signer: string;
    currency: string;
    amount: string;
    timestamp: string;
};

export type JupTokenInfo = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
    tags: string[];
    daily_volume: number;
};

export type JupQuoteResponse = {
    inputMint: string;
    inAmount: string;
    outputMint: string;
    outAmount: string;
    otherAmountThreshold: string;
    swapMode: 'ExactIn' | 'ExactOut';
    slippageBps: number;
    platformFee?: {
        amount?: string;
        feeBps?: number;
    };
    priceImpactPct: string;
    routePlan: {
        swapInfo: {
            ammKey: string;
            label?: string;
            inputMint: string;
            outputMint: string;
            inAmount: string;
            outAmount: string;
            feeAmount: string;
            feeMint: string;
        };
    }[];
    ammKey: string;
    label?: string;
    feeAmount: string;
    feeMint: string;
    percent: number;
    contextSlot?: number;
    timeTaken?: number;
};

export type JupInstructionAccount = {
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
};

export type JupInstruction = {
    keys: string[];
    programId: string;
    data: string;
    accounts: JupInstructionAccount[];
};

export type JupSwapInstructionsResponse = {
    tokenLedgerInstruction: JupInstruction | null;
    computeBudgetInstructions: JupInstruction[];
    setupInstructions: JupInstruction[] | null;
    swapInstruction: JupInstruction;
    cleanupInstruction: JupInstruction | null;
    otherInstructions: JupInstruction[];
    addressLookupTableAddresses: string[];
    prioritizationFeeLamports: number;
};

export type JupSwapTransactionResponse = {
    swapTransaction: string;
    lastValidBlockHeight: number;
    prioritizationFeeLamports?: number;
};

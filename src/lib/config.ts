export const config = {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    NETWORK: import.meta.env.VITE_SOLANA_NETWORK || 'devnet',
} as const;

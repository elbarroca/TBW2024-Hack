import ky from "ky";

export type TokenMetadata = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  tags: string[];
  daily_volume: number;
};

const FALLBACK_METADATA: Partial<TokenMetadata> = {
  name: "Unknown Token",
  symbol: "???",
  logoURI: "/images/tokens/unknown.png",
  tags: [],
  daily_volume: 0
};

// Add metadata cache
const metadataCache: Record<string, TokenMetadata & { timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getTokenMetadata(mint: string): Promise<TokenMetadata> {
  try {
    // Check cache first
    const cached = metadataCache[mint];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached;
    }

    // First try Jupiter API
    const jupiterMetadata = await ky
      .get(`https://tokens.jup.ag/token/${mint}`, {
        timeout: 5000,
        retry: {
          limit: 2,
          methods: ['get'],
          statusCodes: [408, 413, 429, 500, 502, 503, 504]
        }
      })
      .json<TokenMetadata>();

    const metadata = {
      ...FALLBACK_METADATA,
      ...jupiterMetadata,
      address: mint,
      timestamp: Date.now()
    };

    // Cache the result
    metadataCache[mint] = metadata;
    return metadata;

  } catch (error) {
    console.warn(`Failed to fetch metadata for ${mint}:`, error);
    
    // Return and cache fallback metadata
    const fallback = {
      ...FALLBACK_METADATA,
      address: mint,
      decimals: 9,
      timestamp: Date.now()
    } as TokenMetadata & { timestamp: number };
    
    metadataCache[mint] = fallback;
    return fallback;
  }
}
  

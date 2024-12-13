import ky from "ky";
import { config } from "../../lib/config";

const BIRDEYE_API_URL = "https://public-api.birdeye.so";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Cache interface
interface CacheEntry {
  timestamp: number;
  data: {
    metadata: Record<string, BirdeyeTokenMetadata>;
    marketData: Record<string, BirdeyeMarketData>;
  };
}

// In-memory cache
const tokenDataCache: Map<string, CacheEntry> = new Map();

export type BirdeyeTokenMetadata = {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logo_uri: string;
  extensions: {
    coingecko_id?: string;
    website?: string;
    twitter?: string;
  };
};

export type BirdeyeMarketData = {
  price: number;
};

export type BirdeyePriceData = {
  value: number;
  updateUnixTime: number;
  updateHumanTime: string;
  priceChange24h: number;
};

type BirdeyeResponse<T> = {
  data: T;
  success: boolean;
};

const birdeyeClient = ky.create({
  prefixUrl: BIRDEYE_API_URL,
  headers: {
    'X-API-KEY': config.BIRDEYE_API_KEY,
    'accept': 'application/json'
  },
  timeout: 30000,
  retry: {
    limit: 3,
    methods: ['get'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
    backoffLimit: 3000
  }
});

async function fetchMetadata(mintAddresses: string[]) {
  const response = await birdeyeClient
    .get('defi/v3/token/meta-data/multiple', {
      searchParams: {
        list_address: mintAddresses.join(',')
      },
      headers: {
        'x-chain': 'solana'
      }
    })
    .json<BirdeyeResponse<Record<string, BirdeyeTokenMetadata>>>();

  console.log(response);

  if (!response?.data || typeof response.data !== 'object') {
    throw new Error('No metadata returned from Birdeye');
  }

  return response.data;
}

export async function fetchMarketData(mintAddresses: string[]) {
  const response = await birdeyeClient
    .get('defi/multi_price', {
      searchParams: {
        list_address: mintAddresses.join(',')
      },
      headers: {
        'x-chain': 'solana'
      }
    })
    .json<BirdeyeResponse<Record<string, BirdeyePriceData>>>();

  if (!response?.data || typeof response.data !== 'object') {
    throw new Error('Failed to fetch price data from Birdeye');
  }

  const marketData: Record<string, BirdeyeMarketData> = {};
  const validMintAddresses: string[] = [];

  for (const [address, data] of Object.entries(response.data)) {
    // @ts-ignore
    if (data && data['value']) {
      // @ts-ignore
      marketData[address] = { price: data.value };
      validMintAddresses.push(address);
    }
  }

  if (Object.keys(marketData).length === 0) {
    throw new Error('No valid price data returned from Birdeye');
  }

  return { marketData, validMintAddresses };
}

// Cache helper functions
function getCacheKey(mintAddresses: string[]): string {
  return mintAddresses.sort().join(',');
}

function isValidCache(entry: CacheEntry): boolean {
  const now = Date.now();
  return now - entry.timestamp < CACHE_DURATION_MS;
}

export async function fetchTokensData(mintAddresses: string[]) {
  if (!mintAddresses.length) {
    return { metadata: {}, marketData: {} };
  }

  try {
    // Check cache first
    const cacheKey = getCacheKey(mintAddresses);
    const cachedData = tokenDataCache.get(cacheKey);

    if (cachedData && isValidCache(cachedData)) {
      console.log('Returning cached token data');
      return cachedData.data;
    }

    // If not in cache or expired, fetch fresh data
    const { marketData, validMintAddresses } = await fetchMarketData(mintAddresses);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const metadata = await fetchMetadata(validMintAddresses);
    
    const result = { metadata, marketData };

    // Store in cache
    tokenDataCache.set(cacheKey, {
      timestamp: Date.now(),
      data: result
    });

    // Clean up old cache entries
    for (const [key, entry] of tokenDataCache.entries()) {
      if (!isValidCache(entry)) {
        tokenDataCache.delete(key);
      }
    }

    return result;
  } catch (error) {
    console.error("Error fetching token data:", error);
    throw error;
  }
}

// Add function to clear cache if needed
export function clearTokenDataCache(): void {
  tokenDataCache.clear();
}

// Add function to get cache stats if needed
export function getTokenDataCacheStats(): { size: number; entries: string[] } {
  return {
    size: tokenDataCache.size,
    entries: Array.from(tokenDataCache.keys())
  };
}

export async function getTokenPrice(tokenMint: string): Promise<number> {
  // Check cache first
  for (const [_, entry] of tokenDataCache.entries()) {
    if (isValidCache(entry) && entry.data.marketData[tokenMint]) {
      console.log('Returning cached price for token:', tokenMint);
      return entry.data.marketData[tokenMint].price;
    }
  }

  // If not in cache, fetch fresh data
  const { marketData } = await fetchMarketData([tokenMint]);
  const price = marketData[tokenMint]?.price;

  if (!price) {
    throw new Error(`Could not get price for token ${tokenMint}`);
  }

  return price;
} 
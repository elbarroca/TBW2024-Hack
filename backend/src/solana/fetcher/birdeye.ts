import ky from "ky";
import { config } from "../../lib/config";

const BIRDEYE_API_URL = "https://public-api.birdeye.so";

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

// Create Birdeye client with default configuration
const birdeyeClient = ky.create({
  prefixUrl: BIRDEYE_API_URL,
  headers: {
    'X-API-KEY': config.BIRDEYE_API_KEY,
  },
  timeout: 15000,
  retry: {
    limit: 3,
    methods: ['get'],
    statusCodes: [401, 408, 413, 429, 500, 502, 503, 504],
    backoffLimit: 3000
  }
});

async function fetchMetadata(mintAddresses: string[]) {
  try {
    // Split into chunks of 100 addresses to avoid URL length limits
    const chunkSize = 100;
    const chunks = [];
    for (let i = 0; i < mintAddresses.length; i += chunkSize) {
      chunks.push(mintAddresses.slice(i, i + chunkSize));
    }

    const allMetadata: Record<string, BirdeyeTokenMetadata> = {};

    for (const chunk of chunks) {
      const response = await birdeyeClient
        .get('defi/v3/token/meta-data/multiple', {
          searchParams: {
            list_address: chunk.join(',')
          },
          headers: {
            'x-chain': 'solana'
          }
        })
        .json<BirdeyeResponse<Record<string, BirdeyeTokenMetadata>>>();

      console.log('response', response);
      if (response?.data && typeof response.data === 'object') {
        Object.assign(allMetadata, response.data);
      }

      if (chunks.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    if (Object.keys(allMetadata).length === 0) {
      throw new Error('No metadata returned from Birdeye');
    }

    console.log('allMetadata', allMetadata);

    return allMetadata;
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    throw error;
  }
}

export async function fetchMarketData(mintAddresses: string[]) {
  try {
    const chunkSize = 20;
    const chunks = [];
    for (let i = 0; i < mintAddresses.length; i += chunkSize) {
      chunks.push(mintAddresses.slice(i, i + chunkSize));
    }

    const marketData: Record<string, BirdeyeMarketData> = {};

    for (const chunk of chunks) {
      try {
        const response = await birdeyeClient
          .get('defi/multi_price', {
            searchParams: {
              list_address: chunk.join(',')
            }
          })
          .json<BirdeyeResponse<Record<string, BirdeyePriceData>>>();

        console.log('response', response);
        if (response?.data && typeof response.data === 'object') {
          for (const [address, data] of Object.entries(response.data)) {
            if (typeof data?.value === 'number' && !isNaN(data.value)) {
              marketData[address] = { price: data.value };
            }
          }
        }
      } catch (error) {
        console.warn(`Error fetching chunk ${chunk.join(',')}:`, error);
        continue;
      }

      if (chunks.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    if (Object.keys(marketData).length === 0) {
      throw new Error('Failed to fetch any valid price data from Birdeye');
    }

    return marketData;
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
}

export async function fetchTokensData(mintAddresses: string[]) {
  if (!mintAddresses.length) {
    return { metadata: {}, marketData: {} };
  }

  let metadata: Record<string, BirdeyeTokenMetadata> = {};
  let marketData: Record<string, BirdeyeMarketData> = {};
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      [metadata, marketData] = await Promise.all([
        fetchMetadata(mintAddresses),
        fetchMarketData(mintAddresses)
      ]);
      
      // If we got here, both calls succeeded
      break;
    } catch (error) {
      attempts++;
      console.warn(`Attempt ${attempts} failed:`, error);
      
      if (attempts === maxAttempts) {
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
    }
  }

  return { metadata, marketData };
} 
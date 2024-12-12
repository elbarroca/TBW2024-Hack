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
      }
    })
    .json<BirdeyeResponse<Record<string, BirdeyePriceData>>>();

  if (!response?.data || typeof response.data !== 'object') {
    throw new Error('Failed to fetch price data from Birdeye');
  }

  const marketData: Record<string, BirdeyeMarketData> = {};
  for (const [address, data] of Object.entries(response.data)) {
    if (typeof data?.value === 'number' && !isNaN(data.value)) {
      marketData[address] = { price: data.value };
    }
  }

  if (Object.keys(marketData).length === 0) {
    throw new Error('No valid price data returned from Birdeye');
  }

  return marketData;
}

export async function fetchTokensData(mintAddresses: string[]) {
  if (!mintAddresses.length) {
    return { metadata: {}, marketData: {} };
  }

  try {
    const metadata = await fetchMetadata(mintAddresses);
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting delay
    const marketData = await fetchMarketData(mintAddresses);
    
    return { metadata, marketData };
  } catch (error) {
    console.error("Error fetching token data:", error);
    throw error;
  }
} 
import ky from "ky";

type JupiterPriceV2Response = {
  data: {
    [key: string]: {
      id: string;
      type: 'derivedPrice';
      price: string;
      extraInfo?: {
        confidenceLevel: 'high' | 'medium' | 'low';
        quotedPrice?: {
          buyPrice: string;
          buyAt: number;
          sellPrice: string;
          sellAt: number;
        };
      };
    };
  };
  timeTaken: number;
};

// Rate limiting - Jupiter allows 600 requests/min
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 100; // 100ms between requests

async function rateLimit() {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => 
      setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest)
    );
  }
  lastRequestTime = Date.now();
}

async function fetchPricesWithRetry(
  mintIds: string[], 
  retries = 3,
  vsToken = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
): Promise<JupiterPriceV2Response> {
  try {
    await rateLimit();
    
    const response = await ky.get('https://api.jup.ag/price/v2', {
      searchParams: {
        ids: mintIds.join(','),
        vsToken,
      },
      timeout: 15000,
      retry: {
        limit: 2,
        methods: ['get'],
        statusCodes: [408, 413, 429, 500, 502, 503, 504],
      },
    }).json<JupiterPriceV2Response>();

    // Ensure we return a valid data object even if empty
    return {
      data: response?.data || {},
      timeTaken: response?.timeTaken || 0
    };
  } catch (error) {
    console.warn(`Price fetch failed for mints: ${mintIds.join(', ')}`, error);
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return fetchPricesWithRetry(mintIds, retries - 1, vsToken);
    }
    return { data: {}, timeTaken: 0 };
  }
}

export async function getPrices(
  mints: string[],
  vsToken: string = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
): Promise<{ [mint: string]: number }> {
  const prices: { [mint: string]: number } = {};

  try {
    if (!mints?.length) return prices;

    const chunkSize = 10;
    for (let i = 0; i < mints.length; i += chunkSize) {
      const chunk = mints.slice(i, i + chunkSize);
      
      try {
        const response = await fetchPricesWithRetry(chunk, 3, vsToken);
        
        // Add null check for response.data
        if (!response?.data) {
          console.warn(`No data returned for chunk ${i/chunkSize + 1}`);
          continue;
        }

        Object.entries(response.data).forEach(([mint, data]) => {
          if (!data?.price) {
            console.warn(`No price data for ${mint}`);
            return;
          }

          const price = Number(data.price);
          if (isNaN(price)) {
            console.warn(`Invalid price for ${mint}: ${data.price}`);
            return;
          }

          prices[mint] = price;
        });
      } catch (error) {
        console.warn(`Failed to fetch prices for chunk ${i/chunkSize + 1}:`, error);
      }
    }

    return prices;

  } catch (error) {
    console.error('Error in getPrices:', error);
    return prices;
  }
}
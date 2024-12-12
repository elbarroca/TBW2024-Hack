import ky from "ky";

export type JupQuote = {
    data: {
      [key: string]: TokenPrice;
    };
    timeTaken: number;
};

export type TokenPrice = {
    id: string;
    mintSymbol: string;
    vsToken: string;
    vsTokenSymbol: string;
    price: number;
};

export async function getPrices(
    mints: string[],
    vsToken: string = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
): Promise<JupQuote> {
    const priceUrl = "https://price.jup.ag/v6/price";
    const results: JupQuote = { data: {}, timeTaken: 0 };
  
    // Function to create a query string and check its length
    const createQueryString = (ids: string[]) => {
      const params = new URLSearchParams({ ids: ids.join(","), vsToken });
      return `${priceUrl}?${params.toString()}`;
    };
  
    // Function to fetch prices for a subset of mints
    const fetchSubsetPrices = async (subset: string[]) => {
      const response = await ky
        .get(priceUrl, {
          searchParams: {
            ids: subset.join(","),
            vsToken,
          },
        })
        .json<JupQuote>();
  
      Object.assign(results.data, response.data);
    };
  
    // Split mints into smaller chunks
    let subset: string[] = [];
    for (const mint of mints) {
      const tempSubset = [...subset, mint];
      if (createQueryString(tempSubset).length > 4000) {
        await fetchSubsetPrices(subset);
        subset = [mint];
      } else {
        subset = tempSubset;
      }
    }
  
    if (subset.length > 0) {
      await fetchSubsetPrices(subset);
    }
  
  return results;
}

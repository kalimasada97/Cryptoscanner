"use server"

/**
 * Represents a trading pair on Binance Futures.
 */
export interface BinancePair {
  /**
   * The symbol of the trading pair (e.g., BTCUSDT).
   */
  symbol: string;
  /**
   * The 24-hour volume in USDT.
   */
  volume24h: number;
  /**
   * The open interest.
   */
  openInterest: number;
  /**
   * The spread in USDT.
   */
  spread: number;
}

const API_BASE_URL = 'https://fapi.binance.com';

/**
 * Asynchronously retrieves all Binance Futures USDT pairs with 'TRADING' status.
 *
 * @param apiKey The Binance API key.
 * @param secretKey The Binance secret key.
 * @returns A promise that resolves to an array of BinancePair objects.
 */
export async function getAllBinancePairs(
  apiKey: string,
  secretKey: string
): Promise<BinancePair[]> {
  try {
    const exchangeInfo = await binanceRequest('/fapi/v1/exchangeInfo', apiKey, secretKey);
    const symbols = exchangeInfo.symbols
        .filter((s: any) => s.quoteAsset === 'USDT' && s.status === 'TRADING')
        .map((s: any) => s.symbol);

    const tickers = await binanceRequest('/fapi/v1/ticker/24hr', apiKey, secretKey);
    const openInterest = await binanceRequest('/fapi/v1/openInterestStats', apiKey, secretKey);

    return symbols.map((symbol: string) => {
      const ticker = tickers.find((t: any) => t.symbol === symbol);
      const oi = openInterest.find((o: any) => o.symbol === symbol);

      return {
        symbol: symbol,
        volume24h: parseFloat(ticker?.volume || '0'),
        openInterest: parseFloat(oi?.sumOpenInterestValue || '0'),
        spread: parseFloat(ticker?.weightedAvgPrice || '0')
      }
    });

  } catch (error) {
    console.error('Error fetching Binance pairs:', error);
    throw error;
  }
}

async function binanceRequest(endpoint: string, apiKey: string, secretKey: string) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'X-MBX-APIKEY': apiKey,
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

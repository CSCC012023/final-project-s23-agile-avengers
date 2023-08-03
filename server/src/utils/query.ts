import { load } from 'ts-dotenv';

export type AlphaVantageParams = Record<string, string | number>;

/**
 * Makes an API request to AlphaVantage.
 *
 * @param {AlphaVantageParams} params - The parameters to pass to the API.
 * @return {Promise} A Promise that resolves with the API response or rejects with an error.
 */
export const queryAlphaVantage = async (params: AlphaVantageParams) => {
  try {
    // Load and Set API key from environment variable
    const { ALPHAVANTAGE_API_KEY } = load({ ALPHAVANTAGE_API_KEY: String });

    // Serializes the Params Dictionary
    const serializedParams = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');

    // Sends the Request and returns a Response
    const url = `https://www.alphavantage.co/query?${serializedParams}&apikey=${ALPHAVANTAGE_API_KEY}`;
    const response: Response = await fetch(url);
    return response.ok ? await response.json() : {};
  } catch (error) {
    console.error(error);
    return {
      type: 'InternalServerError',
      message: 'An error occurred while making the API request.',
    };
  }
};

type GlobalQuoteResponse = {
  'Global Quote': {
    '01. symbol': string;
    '02. open': number;
    '03. high': number;
    '04. low': number;
    '05. price': number;
    '06. volume': number;
    '07. latest trading day': string;
    '08. previous close': number;
    '09. change': number;
    '10. change percent': string;
  };
};

type GlobalQuote = {
  symbol: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume: number;
  latestTradingDat: string;
  previousClose: number;
  change: number;
  changePercent: string;
};

export const getGlobalQuote = async (
  symbol: string,
): Promise<GlobalQuote | undefined> => {
  const { 'Global Quote': globalQuote }: GlobalQuoteResponse =
    await queryAlphaVantage({
      function: 'GLOBAL_QUOTE',
      symbol: symbol,
    });

  return Object.keys(globalQuote).length === 0
    ? undefined
    : {
        symbol: globalQuote['01. symbol'],
        open: globalQuote['02. open'],
        high: globalQuote['03. high'],
        low: globalQuote['04. low'],
        price: globalQuote['05. price'],
        volume: globalQuote['06. volume'],
        latestTradingDat: globalQuote['07. latest trading day'],
        previousClose: globalQuote['08. previous close'],
        change: globalQuote['09. change'],
        changePercent: globalQuote['10. change percent'],
      };
};

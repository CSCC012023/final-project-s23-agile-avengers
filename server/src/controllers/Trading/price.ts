import { Request, Response } from 'express';
import { createError } from '../../utils/error';
import { queryAlphaVantage } from '../../utils/query';
import { validateInput } from '../../utils/validate';

/**
 * Retrieves the latest price for a given symbol
 *
 * @param {Request} req - Request Object must contain `symbol` in query
 * @param {Response} res - Response Object
 *
 * @return {Promise} Response Object with an Error or the Latest Price
 */
export const getTradingSymbolPrice = async (req: Request, res: Response) => {
  try {
    const symbol = req.query.symbol as string;
    const { status, error } = validateInput('symbol', symbol, 'symbol');
    if (!status) return res.status(400).json(error);

    const { 'Global Quote': globalQuote } = await queryAlphaVantage({
      function: 'GLOBAL_QUOTE',
      symbol,
    });

    if (!globalQuote || Object.keys(globalQuote).length === 0)
      return res
        .status(400)
        .json({ message: 'Invalid symbol or no data available' });

    const response = {
      symbol: globalQuote['01. symbol'],
      price: globalQuote['05. price'],
    };

    res.status(200).json(response);
  } catch (error) {
    // Handle specific errors from queryAlphaVantage function if needed
    res
      .status(500)
      .json(createError('InternalServerError', 'Failed to retrieve the Price'));
  }
};

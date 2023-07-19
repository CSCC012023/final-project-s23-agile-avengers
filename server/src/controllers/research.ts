/* eslint-disable camelcase */
import { Request, Response } from 'express';

import { createError } from '../utils/error';
import { queryAlphaVantage } from '../utils/query';

import { TopStocksResults } from '../types/research';

/**
 *
 * @param {Request} req - Must contain `userID` in body
 * @param {Response} res - Response Object
 *
 * @return {Response} - Response Object with an Error or Success
 */
export const getTopStocks = async (req: Request, res: Response) => {
  try {
    const { top_gainers, top_losers, most_actively_traded }: TopStocksResults =
      await queryAlphaVantage({ function: 'TOP_GAINERS_LOSERS' });

    const response = {
      topGainers: top_gainers
        ? top_gainers.slice(0, 10).map((stock) => stock.ticker)
        : [],
      topLosers: top_losers
        ? top_losers.slice(0, 10).map((stock) => stock.ticker)
        : [],
      mostActivelyTraded: most_actively_traded
        ? most_actively_traded.slice(0, 10).map((stock) => stock.ticker)
        : [],
    };

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json(
        createError('InternalServerError', 'Failed to retrieve Top Stocks')
      );
  }
};

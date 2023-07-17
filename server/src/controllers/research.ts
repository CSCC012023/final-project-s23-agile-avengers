/* eslint-disable camelcase */
import { Request, Response } from 'express';

import { queryAlphaVantage } from '../utils/query';

/**
 *
 * @param {Request} req - Must contain `userID` in body
 * @param {Response} res - Response Object
 *
 * @return {Response} - Response Object with an Error or Success
 */
export const getTop10Stocks = async (req: Request, res: Response) => {
  try {
    const { top_gainers } = await queryAlphaVantage({
      function: 'TOP_GAINERS_LOSERS',
    });
    return top_gainers
      ? res.status(200).json(top_gainers.slice(0, 10))
      : res.status(404).json({ message: 'Unable to pull Top 10 Stocks' });
  } catch (e: any) {
    console.log('error is this: ', e);
    return res.status(404).json({ message: 'Unable to pull Top 10 Stocks' });
  }
};

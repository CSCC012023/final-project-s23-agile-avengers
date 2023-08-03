import { Request, Response } from 'express';
import { queryAlphaVantage } from '../../utils/query';
import { validateInput } from '../../utils/validate';

/**
 *
 * @param {Request} req - Must contain `userID` in body
 * @param {Response} res - Response Object
 *
 * @return {Response} - Response Object with an Error or Success
 */
export const currentPrice = async (req: Request, res: Response) => {
  const symbol = req.query.symbol as string;
  const { status, error } = validateInput('symbol', symbol, 'symbol');

  if (!status) return res.status(400).json(error);

  const response = await queryAlphaVantage({
    function: 'GLOBAL_QUOTE',
    symbol: symbol,
  });

  return res.send(response);
};

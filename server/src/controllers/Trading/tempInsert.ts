import { Request, Response } from 'express';

import modelPortfolio from '../../models/Trading/portfolio';

/**
 * Retrieves all Courses
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 *
 * @return {Promise} Response Object with an Error or portfolio of user
 */
export const tempInsert = async (req: Request, res: Response) => {
  await modelPortfolio.collection.insertOne({
    userID: 'user_2RIa5pddeHC0S0QMEOEobZehlIJ',
    equity: [
        {
          date: new Date('2023-07-06T12:34:56.789Z'),
          action: 'buy',
          order: 'market',
          symbol: 'IBM',
          quantity: 5,
          price: 132,
        },
        {
            date: new Date('2023-07-06T12:34:56.789Z'),
            action: 'buy',
            order: 'market',
            symbol: 'TSL',
            quantity: 5,
            price: 276,
          },
    ]
  });
  return res.send("done");

};
import { Request, Response } from 'express';

import modelUser from '../../models/Account/user';
import modelAccount from '../../models/Trading/account';
import modelPortfolio from '../../models/Trading/portfolio';

import { getGlobalQuote } from '../../utils/query';

import { createError } from '../../utils/error';
import { validateTradeOrder } from '../../utils/validate';

const getTradingModels = async (userID: string, symbol: string) => {
  const user = await modelUser.findOne({ userID });
  const modelsStatus = false;

  if (!user)
    return {
      modelsStatus,
      modelsError: createError(
        'UserDoesNotExist',
        `User with ID: ${userID} does not exist`,
      ),
    };

  const tradingAccount = await modelAccount
    .findOne({ userID: user.id })
    .select('cash value holdings');

  if (!tradingAccount)
    return {
      modelsStatus,
      modelsError: createError(
        'UserDoesNotExist',
        `User with ID: ${userID} does not have a Trading Account`,
      ),
    };

  const portfolio = await modelPortfolio.findOne({ userID: user.id });

  if (!portfolio)
    return {
      modelsStatus,
      modelsError: createError(
        'UserDoesNotExist',
        `User with ID: ${userID} does not have a Trading Account`,
      ),
    };

  const quote = await getGlobalQuote(symbol);

  if (quote === undefined)
    return {
      modelsStatus,
      modelsError: createError(
        'AlphaVantageError',
        'Unable to Retrive Latest Price',
      ),
    };

  if (quote === null)
    return {
      modelsStatus,
      modelsError: createError(
        'InvalidTickerSymbol',
        `Symbol ${symbol} does not exist`,
      ),
    };

  return {
    modelsStatus: true,
    modelsError: {},
    tradingAccount,
    portfolio,
    price: quote.price,
  };
};

export const buyStocks = async (req: Request, res: Response) => {
  try {
    const userID = req.body.userID as string;
    const symbol = req.body.symbol as string;
    const order = req.body.order as string;

    const { status, error } = validateTradeOrder(
      userID,
      symbol,
      req.body.quantity as string,
      order,
    );
    if (!status) return res.status(400).send(error);

    const quantity = parseInt(req.body.quantity as string);

    const { modelsStatus, modelsError, tradingAccount, portfolio, price } =
      await getTradingModels(userID, symbol);

    if (!modelsStatus || !tradingAccount || !portfolio || !price)
      return res.send(400).json(modelsError);

    tradingAccount.cash -= price * quantity;
    tradingAccount.holdings.equity.set(
      symbol,
      tradingAccount.holdings.equity.has(symbol)
        ? (tradingAccount.holdings.equity.get(symbol) as number) + quantity
        : quantity,
    );
    tradingAccount.save();

    portfolio.equity.push({
      action: 'buy',
      order: 'market',
      symbol,
      quantity,
      price,
    });
    portfolio.save();

    res.status(200).json({
      cash: tradingAccount.cash,
      symbol,
      price,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        createError(
          'InternalServerError',
          'Failed to retrieve User Trading Account',
        ),
      );
  }
};

import { exit } from 'process';

import modelUser from '../../models/Account/user';
import modelAccount from '../../models/Trading/account';
import modelPortfolio from '../../models/Trading/portfolio';

export const clearTradingDB = async () => {
  await modelAccount
    .deleteMany({})
    .then(() => console.info('Account Collection Erased! ❌'));
  await modelPortfolio
    .deleteMany({})
    .then(() => console.info('Portfolio Collection Erased! ❌'));
};

export const seedTradingDB = async () => {
  const users = await modelUser.find().select('_id');

  console.info('Seeding Trading...');

  const portfolios = users.flatMap((user) => {
    return {
      userID: user._id,
      equity: [
        {
          date: Date.now(),
          action: 'buy',
          order: 'market',
          symbol: 'MSFT',
          quantity: Math.floor(Math.random() * 9) + 1,
          price: 326.66,
        },
        {
          date: Date.now(),
          action: 'buy',
          order: 'market',
          symbol: 'AAPL',
          quantity: Math.floor(Math.random() * 9) + 1,
          price: 191.38,
        },
      ],
    };
  });

  await modelPortfolio
    .insertMany(portfolios)
    .then(() => {
      console.info('Portfolios Seeded! ✅');
    })
    .catch((err) => {
      console.error(err);
      exit(1);
    });

  const accounts = portfolios.flatMap(({ userID, equity }) => {
    const currAAPLPrice = Math.random() * (192.37 - 190.69) + 190.69;
    const currMSFTPrice = Math.random() * (329.88 - 325.95) + 325.95;

    const AAPLOwned = equity.find((value) => value.symbol === 'AAPL');
    const MSFTOwned = equity.find((value) => value.symbol === 'MSFT');

    const cash =
      100000 -
      ((AAPLOwned?.price || 191.38) * (AAPLOwned?.quantity || 1) +
        (MSFTOwned?.price || 326.66) * (MSFTOwned?.quantity || 1));

    const value =
      cash +
      (currAAPLPrice - (AAPLOwned?.price || 191.38)) *
        (AAPLOwned?.quantity || 1) +
      (currMSFTPrice - (MSFTOwned?.price || 326.66)) *
        (MSFTOwned?.quantity || 1);

    return {
      userID,
      cash,
      value,
      holdings: {
        equity: {
          AAPL: AAPLOwned?.quantity || 1,
          MSFT: MSFTOwned?.quantity || 1,
        },
      },
    };
  });

  await modelAccount
    .insertMany(accounts)
    .then(() => {
      console.info('Accounts Seeded! ✅');
    })
    .catch((err) => {
      console.error(err);
      exit(1);
    });
};

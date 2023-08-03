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
  users.flatMap(async (user) => {
    const stockPrice = Math.random() * (192.37 - 190.69) + 190.69;
    const numOwned = Math.floor(Math.random() * 9) + 1;
    const cash = 100000 - 191.38 * numOwned;
    await modelAccount.create({
      userID: user._id,
      cash,
      value: cash + (stockPrice - 191.38) * numOwned,
      holdings: {
        equity: {
          AAPL: numOwned,
        },
      },
    });

    await modelPortfolio.create({
      userID: user._id,
      equity: {
        date: Date.now(),
        action: 'buy',
        order: 'market',
        symbol: 'AAPL',
        quantity: numOwned,
        price: 191.38,
      },
    });
  });
};

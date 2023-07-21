import { Schema, model } from 'mongoose';

import { Portfolio } from '../../types/trading';

const PortfolioSchema = new Schema<Portfolio>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
    unique: true,
  },
  equity: {
    type: [
      {
        dateBought: {
          type: Date,
          required: true,
        },
        action: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        symbol: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

const modelPortfolio = model<Portfolio>('Portfolio', PortfolioSchema);
export default modelPortfolio;

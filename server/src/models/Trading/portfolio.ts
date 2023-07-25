import { Schema, model } from 'mongoose';

import { Portfolio } from '../../types/trading';

const PortfolioSchema = new Schema<Portfolio>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
    unique: true,
  },
  equity: [
    {
      date: {
        type: Date,
        required: true,
        immutable: true,
      },
      action: {
        type: String,
        required: true,
        immutable: true,
      },
      order: {
        type: String,
        required: true,
        immutable: true,
      },
      symbol: {
        type: String,
        required: true,
        immutable: true,
      },
      quantity: {
        type: Number,
        required: true,
        immutable: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        immutable: true,
        min: 0,
      },
    },
  ],
});

const modelPortfolio = model<Portfolio>('Portfolio', PortfolioSchema);
export default modelPortfolio;

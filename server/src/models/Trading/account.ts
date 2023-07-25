import { Schema, model } from 'mongoose';

import { Account } from '../../types/trading';

const AccountSchema = new Schema<Account>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
    unique: true,
  },
  cash: {
    type: Number,
    min: 0,
    default: 100000,
    required: true,
  },
  holdings: {
    type: Number,
    min: 0,
    required: true,
  },
});

const modelAccount = model<Account>('Account', AccountSchema);
export default modelAccount;

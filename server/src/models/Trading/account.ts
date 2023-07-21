import { Schema, model } from 'mongoose';

import { Account } from '../../types/trading';

const AccountSchema = new Schema<Account>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
    unique: true,
  },
  cash: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const modelAccount = model<Account>('Account', AccountSchema);
export default modelAccount;

import { Types } from 'mongoose';

/*
Types needed for Trading models
*/
export interface Equity {
  date: Date;
  action: 'buy' | 'sell';
  order: 'market';
  symbol: String;
  quantity: number;
  price: number;
}

export interface Portfolio {
  userID: Types.ObjectId;
  equity: Array<Equity>;
}

export interface Account {
  userID: Types.ObjectId;
  cash: number;
  holdings: number;
}

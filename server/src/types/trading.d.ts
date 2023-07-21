import { Types } from 'mongoose';

/*
Types needed for Trading models
*/
export interface Equity {
  _id: Types.ObjectId;
  dateBought: Date;
  action: "buy" | "sell";
  type: String;
  symbol: String;
  quantity: number;
  price: number;
  value: number;
}

export interface Portfolio {
    userId: Types.ObjectId;
    equity: [Equity];
}

export interface Account {
    userId: Types.ObjectId;
    cash: number;
    value: number; // not sure if this is needed
}
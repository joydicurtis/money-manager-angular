import { Timestamp } from 'firebase/firestore';

export type Transaction = {
  id?: string;
  type: TransactionType;
  date: any;
  sum: number;
  category: Category;
  note: string;
}

export type Category = {
  id: number;
  name: string;
  icon: string;
}

export type TransactionType = {
  value: string;
  name: string;
}

export type dialogData = {
  item: Transaction;
  expensesMode?: boolean;
  incomesMode?: boolean;
}

export type TransactionGroup = {
  date: string | Date;
  data: Transaction[];
}

export type Rates = {
  [currency: string]: number;
}

export type CurrencyData = {
  base_code: string;
  conversion_rates: Rates;
  documentation: string;
  result: string;
  terms_of_use: string;
  time_last_update_unix: Timestamp;
  time_last_update_utc: string;
  time_next_update_unix: Timestamp;
  time_next_update_utc: string
}

export type CurrencyRate = {
  name: string;
  symbol: string;
  amount?: number;
}

export type TestData = {
  id?: number,
  title: string,
  body: string,
  userId?: number,
  tags?: string[],
  date?: Date
}

export type User = {
  id?: number,
  email: string,
  password: string
}

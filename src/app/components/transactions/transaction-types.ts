import { Timestamp } from 'firebase/firestore';

export type Transaction = {
  id: string;
  type: TransactionType;
  date: Timestamp;
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
  key: string;
  data: Transaction[];
}

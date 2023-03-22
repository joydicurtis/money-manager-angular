import { Timestamp } from 'firebase/firestore';

export interface Transaction {
  id: string;
  type: TransactionType;
  date: Timestamp;
  sum: number;
  category: Category;
  note: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface TransactionType {
  value: string;
  name: string;
}

export interface dialogData {
  item: Transaction;
  isIncomes: boolean;
  isExpenses: boolean;
}

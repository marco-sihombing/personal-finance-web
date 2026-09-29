import type {
  Account,
  Category,
  Transaction,
  TransactionType,
} from "./entity.types";

export type { Account, Category, Transaction, TransactionType };

export interface TransactionFormValues {
  accountId: string;
  categoryId: string;
  transactionType: TransactionType;
  amount: string;
  transactionDate: string;
  description: string;
}

export interface CreateTransactionPayload {
  accountId: string;
  categoryId: string;
  transactionType: TransactionType;
  amount: number;
  transactionDate: string;
  description: string | null;
}

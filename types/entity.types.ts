export type TransactionType = "income" | "expense";

export interface Account {
  id: string;
  userId: string;
  name: string;
  accountType: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  userId: string | null;
  name: string;
  categoryType: TransactionType;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  categoryId: string;
  transactionType: TransactionType;
  amount: number;
  transactionDate: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string | null;
  createdAt: string;
  updatedAt: string;
}

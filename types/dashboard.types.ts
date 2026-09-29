import type {
  Account,
  FinancialGoal as BaseFinancialGoal,
} from "./entity.types";

export type AccountSummary = Pick<
  Account,
  "id" | "name" | "accountType" | "balance"
>;

export interface AccountTypeSummary {
  accountType: string;
  totalBalance: number;
  accounts: Pick<Account, "id" | "name" | "balance">[];
}

export interface FinancialGoal extends BaseFinancialGoal {
  remaining: number;
  progress: number;
  isCompleted: boolean;
}

export interface BudgetItem {
  id: string;
  amount: number;
  periodStart: string;
  periodEnd: string;
  category: {
    id: string;
    name: string;
    categoryType: string;
  } | null;
}

export interface CategorySummary {
  categoryId: string;
  transactionType: string;
  totalAmount: number;
}

export interface PeriodInfo {
  month: number;
  year: number;
  monthStart: string;
  nextMonthStart: string;
  yearStart: string;
  nextYearStart: string;
}

export interface TransactionPeriodSummary {
  income: number;
  expense: number;
  net: number;
}

export interface TransactionsSummary {
  month: TransactionPeriodSummary;
  year: TransactionPeriodSummary;
  categorySummary: CategorySummary[];
}

export interface BudgetPeriodSummary {
  total: number;
  items: BudgetItem[];
}

export interface BudgetSummary {
  month: BudgetPeriodSummary;
  year: BudgetPeriodSummary;
}

export interface BalanceSummary {
  total: number;
  byAccountType: AccountTypeSummary[];
  accounts: AccountSummary[];
}

export interface DashboardData {
  period: PeriodInfo;
  financialGoals: FinancialGoal[];
  transactions: TransactionsSummary;
  budget: BudgetSummary;
  balance: BalanceSummary;
}

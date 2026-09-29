import type { Budget, Transaction } from "@/types";

export function getActualAmount(
  budget: Budget,
  transactions: Transaction[],
): number {
  const start = new Date(budget.periodStart);
  const end = new Date(budget.periodEnd);

  return transactions
    .filter((t) => {
      const date = new Date(t.transactionDate);
      return (
        t.transactionType === "expense" &&
        t.categoryId === budget.categoryId &&
        date >= start &&
        date <= end
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getBudgetProgress(
  budgetAmount: number,
  actualAmount: number,
): number {
  if (budgetAmount <= 0) return 0;
  return Math.min((actualAmount / budgetAmount) * 100, 100);
}

export function getRemainingAmount(
  budgetAmount: number,
  actualAmount: number,
): number {
  return budgetAmount - actualAmount;
}

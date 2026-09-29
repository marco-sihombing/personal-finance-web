"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "./AccountsSection";
import {
  formatCurrency,
  getBudgetProgress,
} from "@/lib/utils/format";
import type { BudgetItem, CategorySummary } from "@/types";

interface BudgetSectionProps {
  items: BudgetItem[];
  total: number;
  categorySummary: CategorySummary[];
}

export function BudgetSection({
  items,
  total,
  categorySummary,
}: BudgetSectionProps) {
  const router = useRouter();

  const getActual = (budget: BudgetItem) =>
    categorySummary
      .filter(
        (t) =>
          t.transactionType === "expense" &&
          t.categoryId === budget.category?.id,
      )
      .reduce((sum, t) => sum + t.totalAmount, 0);

  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold sm:text-xl">
            Budget This Month
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your monthly spending limits.
          </p>
        </div>
        <PrimaryButton onClick={() => router.push("/budgets")}>
          Manage Budgets
        </PrimaryButton>
      </div>

      <div className="mt-5">
        <div className="mb-5 flex items-center justify-between rounded-xl bg-yellow-50 px-4 py-3">
          <span className="text-sm text-gray-600">Total Budget</span>
          <span className="text-sm font-bold sm:text-base">
            {formatCurrency(total)}
          </span>
        </div>

        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">
              No budgets for this month.
            </p>
          ) : (
            items.slice(0, 5).map((budget) => (
              <BudgetItemRow
                key={budget.id}
                budget={budget}
                actual={getActual(budget)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function BudgetItemRow({
  budget,
  actual,
}: {
  budget: BudgetItem;
  actual: number;
}) {
  const progress = getBudgetProgress(actual, budget.amount);
  const isOverspent = progress >= 100;

  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium">
          {budget.category?.name ?? "Uncategorized"}
        </span>
        <span className="text-gray-600">
          {formatCurrency(actual)} / {formatCurrency(budget.amount)}
        </span>
      </div>

      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-yellow-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isOverspent
              ? "bg-gradient-to-r from-red-400 to-rose-500"
              : "bg-gradient-to-r from-amber-400 to-yellow-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
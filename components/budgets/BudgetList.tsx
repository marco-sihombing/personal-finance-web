"use client";

import { BudgetCard } from "./BudgetCard";
import type { Budget, Transaction } from "@/types";

interface BudgetListProps {
  budgets: Budget[];
  transactions: Transaction[];
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

export function BudgetList({
  budgets,
  transactions,
  onEdit,
  onDelete,
}: BudgetListProps) {
  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">Your Budgets</h2>
      <p className="mt-1 text-sm text-gray-500">
        Monitor spending against the limits you set.
      </p>

      <div className="mt-5 space-y-4">
        {budgets.length === 0 ? (
          <div className="rounded-xl bg-yellow-50/60 p-6 text-center text-sm text-gray-500">
            No budgets yet.
          </div>
        ) : (
          budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              transactions={transactions}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}

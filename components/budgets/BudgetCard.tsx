"use client";

import { formatRupiah } from "@/lib/utils/currency";
import {
  getActualAmount,
  getBudgetProgress,
  getRemainingAmount,
} from "@/lib/utils/budget";
import type { Budget, Transaction } from "@/types";

interface BudgetCardProps {
  budget: Budget;
  transactions: Transaction[];
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

export function BudgetCard({
  budget,
  transactions,
  onEdit,
  onDelete,
}: BudgetCardProps) {
  const actual = getActualAmount(budget, transactions);
  const remaining = getRemainingAmount(budget.amount, actual);
  const progress = getBudgetProgress(budget.amount, actual);
  const isOverBudget = actual > budget.amount;

  return (
    <div className="rounded-xl border border-yellow-100 bg-yellow-50/40 p-4 transition hover:bg-yellow-100/60 sm:p-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
            {budget.category?.name ?? "Unknown Category"}
          </h3>
          <p className="text-xs text-gray-500 sm:text-sm">
            {new Date(budget.periodStart).toLocaleDateString("id-ID")} —{" "}
            {new Date(budget.periodEnd).toLocaleDateString("id-ID")}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(budget)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(budget.id)}
            className="rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Amount summary */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat label="Budget" value={formatRupiah(budget.amount)} />
        <Stat
          label="Actual"
          value={formatRupiah(actual)}
          color={isOverBudget ? "text-red-600" : "text-gray-900"}
        />
        <Stat
          label="Remaining"
          value={formatRupiah(remaining)}
          color={remaining < 0 ? "text-red-600" : "text-green-600"}
        />
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs text-gray-500 sm:text-sm">
          <span>Spending Progress</span>
          <span
            className={`font-medium ${isOverBudget ? "text-red-600" : "text-amber-700"}`}
          >
            {progress.toFixed(1)}%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-yellow-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget
                ? "bg-gradient-to-r from-red-400 to-rose-500"
                : "bg-gradient-to-r from-amber-400 to-yellow-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  color = "text-gray-900",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 sm:text-sm">{label}</p>
      <p className={`mt-0.5 text-sm font-semibold sm:text-base ${color}`}>
        {value}
      </p>
    </div>
  );
}

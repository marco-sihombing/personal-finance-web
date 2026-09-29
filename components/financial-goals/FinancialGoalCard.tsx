"use client";

import { formatCurrency, formatDate } from "@/lib/utils/format";
import type { FinancialGoalEntity } from "@/types";

interface FinancialGoalCardProps {
  goal: FinancialGoalEntity;
  onEdit: (goal: FinancialGoalEntity) => void;
  onDelete: (id: string) => void;
}

export function FinancialGoalCard({
  goal,
  onEdit,
  onDelete,
}: FinancialGoalCardProps) {
  const progress =
    goal.targetAmount > 0
      ? Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
      : 0;

  const isCompleted = progress >= 100;
  const remaining = Math.max(goal.targetAmount - goal.currentAmount, 0);

  return (
    <div className="rounded-xl border border-yellow-100 bg-yellow-50/40 p-4 transition hover:bg-yellow-100/60 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
            {goal.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Target date: {formatDate(goal.targetDate)}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(goal)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Amount */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-600">
          {formatCurrency(goal.currentAmount)}
        </span>
        <span className="font-medium text-gray-900">
          {formatCurrency(goal.targetAmount)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-yellow-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isCompleted
              ? "bg-gradient-to-r from-green-400 to-emerald-500"
              : "bg-gradient-to-r from-amber-400 to-yellow-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs sm:text-sm">
        <span
          className={`font-medium ${
            isCompleted ? "text-green-600" : "text-amber-700"
          }`}
        >
          {isCompleted && "✅ "}
          {progress.toFixed(1)}% completed
        </span>
        <span className="font-medium text-gray-700">
          {isCompleted
            ? "Goal achieved! 🎉"
            : `Remaining: ${formatCurrency(remaining)}`}
        </span>
      </div>
    </div>
  );
}

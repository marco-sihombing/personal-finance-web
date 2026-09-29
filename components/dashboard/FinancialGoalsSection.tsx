"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "./AccountsSection";
import {
  formatCurrency,
  formatDate,
  getGoalProgress,
} from "@/lib/utils/format";
import type { FinancialGoal } from "@/types";

interface FinancialGoalsSectionProps {
  goals: FinancialGoal[];
}

export function FinancialGoalsSection({ goals }: FinancialGoalsSectionProps) {
  const router = useRouter();

  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold sm:text-xl">Financial Goals</h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your financial goals.
          </p>
        </div>
        <PrimaryButton onClick={() => router.push("/financial-goals")}>
          Manage Goals
        </PrimaryButton>
      </div>

      <div className="mt-5 space-y-5">
        {goals.length === 0 ? (
          <p className="text-sm text-gray-500">No financial goals yet.</p>
        ) : (
          goals
            .slice(0, 5)
            .map((goal) => <GoalItem key={goal.id} goal={goal} />)
        )}
      </div>
    </section>
  );
}

function GoalItem({ goal }: { goal: FinancialGoal }) {
  const progress = getGoalProgress(goal.currentAmount, goal.targetAmount);

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium sm:text-base">
            {goal.name}
          </p>
          <p className="text-xs text-gray-500 sm:text-sm">
            Target: {formatCurrency(goal.targetAmount)}
          </p>
        </div>
        <p className="shrink-0 text-sm font-semibold text-amber-700 sm:text-base">
          {progress.toFixed(1)}%
        </p>
      </div>

      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-yellow-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-1 flex justify-between text-xs text-gray-500 sm:text-sm">
        <span>{formatCurrency(goal.currentAmount)}</span>
        <span>{formatDate(goal.targetDate)}</span>
      </div>
    </div>
  );
}

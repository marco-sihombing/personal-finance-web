"use client";

import { FinancialGoalCard } from "./FinancialGoalCard";
import type { FinancialGoalEntity } from "@/types";

interface FinancialGoalListProps {
  goals: FinancialGoalEntity[];
  onEdit: (goal: FinancialGoalEntity) => void;
  onDelete: (id: string) => void;
}

export function FinancialGoalList({
  goals,
  onEdit,
  onDelete,
}: FinancialGoalListProps) {
  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">My Financial Goals</h2>
      <p className="mt-1 text-sm text-gray-500">
        All the financial goals you have set.
      </p>

      <div className="mt-5 space-y-4">
        {goals.length === 0 ? (
          <div className="rounded-xl bg-yellow-50/60 p-6 text-center text-sm text-gray-500">
            No financial goals yet.
          </div>
        ) : (
          goals.map((goal) => (
            <FinancialGoalCard
              key={goal.id}
              goal={goal}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}

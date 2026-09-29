"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "./AccountsSection";
import { formatCurrency } from "@/lib/utils/format";
import type { TransactionsSummary } from "@/types";

interface TransactionsSectionProps {
  transactions: TransactionsSummary;
}

export function TransactionsSection({
  transactions,
}: TransactionsSectionProps) {
  const router = useRouter();
  const { month, year } = transactions;

  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold sm:text-xl">Transactions</h2>
          <p className="mt-1 text-sm text-gray-500">
            Your transaction summary.
          </p>
        </div>
        <PrimaryButton onClick={() => router.push("/transactions")}>
          View Transactions
        </PrimaryButton>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Income"
          value={formatCurrency(month.income)}
          color="text-green-600"
          bg="bg-green-50"
          border="border-green-100"
        />
        <StatCard
          label="Expense"
          value={formatCurrency(month.expense)}
          color="text-red-600"
          bg="bg-red-50"
          border="border-red-100"
        />
        <StatCard
          label="Net"
          value={formatCurrency(month.net)}
          bg="bg-yellow-50"
          border="border-yellow-100"
        />
      </div>

      <div className="mt-6 border-t border-yellow-100 pt-5">
        <h3 className="text-sm font-semibold sm:text-base">Yearly Summary</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <YearlyStat
            label="Yearly Income"
            value={formatCurrency(year.income)}
            color="text-green-600"
          />
          <YearlyStat
            label="Yearly Expense"
            value={formatCurrency(year.expense)}
            color="text-red-600"
          />
          <YearlyStat label="Yearly Net" value={formatCurrency(year.net)} />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  color = "",
  bg,
  border,
}: {
  label: string;
  value: string;
  color?: string;
  bg: string;
  border: string;
}) {
  return (
    <div className={`rounded-xl border ${border} ${bg} p-4`}>
      <p className="text-xs text-gray-500 sm:text-sm">{label}</p>
      <p className={`mt-1 text-lg font-semibold sm:text-xl ${color}`}>
        {value}
      </p>
    </div>
  );
}

function YearlyStat({
  label,
  value,
  color = "",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 sm:text-sm">{label}</p>
      <p className={`text-sm font-semibold sm:text-base ${color}`}>{value}</p>
    </div>
  );
}

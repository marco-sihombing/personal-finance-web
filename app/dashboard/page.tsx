"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { AccountsSection } from "@/components/dashboard/AccountsSection";
import { FinancialGoalsSection } from "@/components/dashboard/FinancialGoalsSection";
import { BudgetSection } from "@/components/dashboard/BudgetSection";
import { TransactionsSection } from "@/components/dashboard/TransactionsSection";
import { ManageSection } from "@/components/dashboard/ManageSection";

export default function DashboardPage() {
  const { user, dashboard, loading, error, reload } = useDashboard();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={reload} />;
  }

  if (!user || !dashboard) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 text-gray-900">
      <DecorativeBackground />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <DashboardHeader user={user} />

        <div className="mt-6 flex items-center justify-between gap-3 sm:mt-8">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-700 sm:text-sm">
            Financial overview — {dashboard.period.month}/
            {dashboard.period.year}
          </p>
        </div>

        <SummaryCards dashboard={dashboard} />

        <AccountsSection
          accounts={
            dashboard.balance.accounts as unknown as Parameters<
              typeof AccountsSection
            >[0]["accounts"]
          }
        />

        <FinancialGoalsSection goals={dashboard.financialGoals} />

        <BudgetSection
          items={dashboard.budget.month.items}
          total={dashboard.budget.month.total}
          categorySummary={dashboard.transactions.categorySummary}
        />

        <TransactionsSection transactions={dashboard.transactions} />

        <ManageSection />
      </div>
    </main>
  );
}

/* ---------- Local helpers (kecil, tidak perlu file terpisah) ---------- */

function DecorativeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-yellow-300/40 blur-3xl" />
      <div className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-amber-300/40 blur-3xl" />
    </div>
  );
}

function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <h1 className="text-xl font-semibold text-red-600">
          Failed to load dashboard
        </h1>
        <p className="mt-2 text-gray-500">{error}</p>
        <button
          onClick={onRetry}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}

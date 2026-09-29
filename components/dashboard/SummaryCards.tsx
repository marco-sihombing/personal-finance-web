import { formatCurrency } from "@/lib/utils/format";
import type { DashboardData } from "@/types";

interface SummaryCardsProps {
  dashboard: DashboardData;
}

export function SummaryCards({ dashboard }: SummaryCardsProps) {
  const { balance, transactions } = dashboard;
  const net = transactions.month.net;

  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(balance.total),
      color: "text-gray-900",
      icon: "💰",
      accent: "from-yellow-400 to-amber-500",
    },
    {
      label: "Income This Month",
      value: formatCurrency(transactions.month.income),
      color: "text-green-600",
      icon: "📈",
      accent: "from-green-400 to-emerald-500",
    },
    {
      label: "Expense This Month",
      value: formatCurrency(transactions.month.expense),
      color: "text-red-600",
      icon: "📉",
      accent: "from-red-400 to-rose-500",
    },
    {
      label: "Net This Month",
      value: formatCurrency(net),
      color: net >= 0 ? "text-green-600" : "text-red-600",
      icon: "⚖️",
      accent: "from-amber-400 to-yellow-500",
    },
  ];

  return (
    <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="group relative isolate overflow-hidden rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-md shadow-yellow-100/50 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-200/60"
        >
          {/* Decorative blur — pakai -z-10 biar tetap di belakang teks
              tapi TIDAK bikin stacking context baru untuk parent */}
          <div
            className={`pointer-events-none absolute -right-6 -top-6 -z-10 h-20 w-20 rounded-full bg-gradient-to-br ${card.accent} opacity-10 transition group-hover:opacity-20`}
          />

          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500 sm:text-sm">
              {card.label}
            </p>
            <span className="text-lg">{card.icon}</span>
          </div>
          <p
            className={`mt-2 text-xl font-bold tracking-tight sm:text-2xl ${card.color}`}
          >
            {card.value}
          </p>
        </div>
      ))}
    </section>
  );
}

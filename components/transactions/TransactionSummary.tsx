import { formatRupiah } from "@/lib/utils/currency";

interface TransactionSummaryProps {
  totalIncome: number;
  totalExpense: number;
}

export function TransactionSummary({
  totalIncome,
  totalExpense,
}: TransactionSummaryProps) {
  const net = totalIncome - totalExpense;

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <SummaryCard
        label="Total Income"
        value={totalIncome}
        color="text-green-600"
      />
      <SummaryCard
        label="Total Expense"
        value={totalExpense}
        color="text-red-600"
      />
      <SummaryCard label="Net Cash Flow" value={net} color="text-gray-900" />
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${color}`}>
        {formatRupiah(value)}
      </p>
    </div>
  );
}

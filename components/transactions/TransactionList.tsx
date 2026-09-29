"use client";

import { TransactionCard } from "./TransactionCard";
import type { Account, Category, Transaction } from "@/types";

interface TransactionListProps {
  transactions: Transaction[];
  accounts: Account[];
  categories: Category[];
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionList({
  transactions,
  accounts,
  categories,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const getAccountName = (id: string) =>
    accounts.find((a) => a.id === id)?.name ?? "Unknown Account";

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? "Unknown Category";

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">You don't have any transactions yet.</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((t) => (
            <TransactionCard
              key={t.id}
              transaction={t}
              accountName={getAccountName(t.accountId)}
              categoryName={getCategoryName(t.categoryId)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

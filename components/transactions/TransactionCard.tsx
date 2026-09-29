"use client";

import { formatRupiah } from "@/lib/utils/currency";
import type { Transaction } from "@/types";

interface TransactionCardProps {
  transaction: Transaction;
  accountName: string;
  categoryName: string;
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionCard({
  transaction,
  accountName,
  categoryName,
  onEdit,
  onDelete,
}: TransactionCardProps) {
  const isIncome = transaction.transactionType === "income";

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{categoryName}</h3>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                isIncome
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {transaction.transactionType}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{accountName}</p>
          <p className="text-sm text-gray-500">
            {new Date(transaction.transactionDate).toLocaleDateString("id-ID")}
          </p>
          {transaction.description && (
            <p className="mt-1 text-sm text-gray-600">
              {transaction.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <p
            className={`font-semibold ${
              isIncome ? "text-green-600" : "text-red-600"
            }`}
          >
            {isIncome ? "+" : "-"} {formatRupiah(transaction.amount)}
          </p>
          <button
            onClick={() => onEdit(transaction)}
            className="rounded-lg border px-3 py-1 transition hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="rounded-lg bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

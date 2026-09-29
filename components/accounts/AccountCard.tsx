"use client";

import { formatRupiah } from "@/lib/utils/currency";
import type { Account } from "@/types";

interface AccountCardProps {
  account: Account;
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}

const TYPE_LABEL: Record<string, string> = {
  bank: "🏦 Bank",
  cash: "💵 Cash",
  "e-wallet": "📱 E-Wallet",
};

export function AccountCard({ account, onEdit, onDelete }: AccountCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-yellow-100 bg-yellow-50/40 p-4 transition hover:bg-yellow-100/60">
      <div className="min-w-0">
        <p className="truncate font-semibold text-gray-900">{account.name}</p>
        <p className="text-xs text-gray-500">
          {TYPE_LABEL[account.accountType] ?? account.accountType}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <p className="font-semibold text-gray-900">
          {formatRupiah(account.balance)}
        </p>

        <button
          onClick={() => onEdit(account)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(account.id)}
          className="rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

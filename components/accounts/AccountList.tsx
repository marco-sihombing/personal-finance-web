"use client";

import { AccountCard } from "./AccountCard";
import type { Account } from "@/types";

interface AccountListProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}

export function AccountList({ accounts, onEdit, onDelete }: AccountListProps) {
  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">Account List</h2>
      <p className="mt-1 text-sm text-gray-500">
        All accounts you have registered.
      </p>

      <div className="mt-5 space-y-3">
        {accounts.length === 0 ? (
          <p className="text-sm text-gray-500">No accounts available.</p>
        ) : (
          accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils/format";
import type { Account } from "@/types";

interface AccountsSectionProps {
  accounts: Account[];
}

export function AccountsSection({ accounts }: AccountsSectionProps) {
  const router = useRouter();

  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold sm:text-xl">Accounts</h2>
          <p className="mt-1 text-sm text-gray-500">
            Your current account balances.
          </p>
        </div>
        <PrimaryButton onClick={() => router.push("/accounts")}>
          Manage Accounts
        </PrimaryButton>
      </div>

      <div className="mt-5 space-y-3">
        {accounts.length === 0 ? (
          <p className="text-sm text-gray-500">No accounts yet.</p>
        ) : (
          accounts.slice(0, 5).map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between rounded-xl border border-yellow-100 bg-yellow-50/60 p-3 transition hover:bg-yellow-100/70 sm:p-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium sm:text-base">
                  {account.name}
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">
                  {account.accountType}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold sm:text-base">
                {formatCurrency(account.balance)}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

/* Shared button — bisa dipindah ke components/ui */
export function PrimaryButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md shadow-amber-200 transition hover:from-amber-500 hover:to-yellow-600 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

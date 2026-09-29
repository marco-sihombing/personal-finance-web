"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useDashboard } from "@/hooks/useDashboard";
import { useAccounts } from "@/hooks/useAccounts";
import { useAccountForm } from "@/hooks/useAccountForm";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { AccountForm } from "@/components/accounts/AccountForm";
import { AccountList } from "@/components/accounts/AccountList";
import { AccountSummaryCard } from "@/components/accounts/AccountSummaryCard";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import type { Account } from "@/types";

export default function AccountsPage() {
  const router = useRouter();
  const { user } = useDashboard();

  const { accounts, loading, saving, saveAccount, deleteAccount } =
    useAccounts();

  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useAccountForm();
  const confirmDialog = useConfirmDialog();

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  const handleSubmit = async (e: FormEvent<Element>): Promise<void> => {
    e.preventDefault();

    if (!form.validate()) return;

    const success = await saveAccount(form.toPayload(), editingId);
    if (success) {
      form.reset();
      setEditingId(null);
    }
  };

  const handleEdit = (account: Account) => {
    setEditingId(account.id);
    form.loadFromAccount(account);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    confirmDialog.confirm(
      "Hapus Akun?",
      "Tindakan ini tidak bisa dibatalkan. Semua transaksi terkait akan tetap tersimpan.",
      async () => {
        await deleteAccount(id);
      },
    );
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    form.reset();
  };

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading Account...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 text-gray-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-yellow-300/40 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-amber-300/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <DashboardHeader user={user} />

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Accounts</h1>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              Manage your bank accounts, cash, and e-wallets.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 rounded-xl border border-yellow-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-white hover:shadow-md active:scale-95"
          >
            <ArrowLeftIcon />
            Dashboard
          </button>
        </div>

        <AccountSummaryCard
          totalBalance={totalBalance}
          accountCount={accounts.length}
        />

        <AccountForm
          form={form.form}
          isEditing={!!editingId}
          saving={saving}
          onFieldChange={form.updateField}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />

        <AccountList
          accounts={accounts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ConfirmModal
        open={confirmDialog.state.open}
        title={confirmDialog.state.title}
        message={confirmDialog.state.message}
        onConfirm={confirmDialog.accept}
        onCancel={confirmDialog.close}
      />
    </main>
  );
}

/* ---------- Icons ---------- */

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );
}

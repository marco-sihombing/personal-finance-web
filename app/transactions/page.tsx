"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useDashboard } from "@/hooks/useDashboard";
import { useTransactions } from "@/hooks/useTransactions";
import { useTransactionForm } from "@/hooks/useTransactionForm";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionSummary } from "@/components/transactions/TransactionSummary";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import type { Transaction } from "@/types";

export default function TransactionsPage() {
  const router = useRouter();
  const { user } = useDashboard(); // reuse user dari dashboard

  const {
    transactions,
    accounts,
    categories,
    loading,
    saving,
    saveTransaction,
    deleteTransaction,
  } = useTransactions();

  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useTransactionForm({
    accounts,
    categories,
    transactions,
    editingId,
  });

  const confirmDialog = useConfirmDialog();

  const totalIncome = transactions
    .filter((t) => t.transactionType === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.transactionType === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();

    const error = form.validate();
    if (error) {
      // trigger toast via hook — atau lewat context langsung
      // Namun karena hook validate dipanggil di form, kita simpan error di state lokal
      alert(error);
      return;
    }

    const success = await saveTransaction(form.toPayload(), editingId);
    if (success) {
      form.reset();
      setEditingId(null);
    }
  };

  const handleEdit = (t: Transaction) => {
    setEditingId(t.id);
    form.loadFromTransaction(t);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    confirmDialog.confirm(
      "Hapus Transaksi?",
      "Tindakan ini tidak bisa dibatalkan.",
      async () => {
        await deleteTransaction(id);
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
        <p>Loading transactions...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 text-gray-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-yellow-300/40 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-amber-300/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <DashboardHeader user={user} />

        <div className="mt-6 mb-8 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Transactions</h1>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              Record and manage your income and expenses.
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
          >
            ← Dashboard
          </button>
        </div>

        <TransactionSummary
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />

        <TransactionForm
          form={form.form}
          accounts={accounts}
          filteredCategories={form.filteredCategories}
          isEditing={!!editingId}
          saving={saving}
          onFieldChange={form.updateField}
          onTypeChange={form.setTransactionType}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />

        <TransactionList
          transactions={transactions}
          accounts={accounts}
          categories={categories}
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

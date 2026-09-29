"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useDashboard } from "@/hooks/useDashboard";
import { useCategories } from "@/hooks/useCategories";
import { useCategoryForm } from "@/hooks/useCategoryForm";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { CategoryGroup } from "@/components/categories/CategoryGroup";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import type { Category } from "@/types";

export default function CategoriesPage() {
  const router = useRouter();
  const { user } = useDashboard();

  const { categories, loading, saving, saveCategory, deleteCategory } =
    useCategories();

  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useCategoryForm();
  const confirmDialog = useConfirmDialog();

  const incomeCategories = useMemo(
    () => categories.filter((c) => c.categoryType === "income"),
    [categories],
  );
  const expenseCategories = useMemo(
    () => categories.filter((c) => c.categoryType === "expense"),
    [categories],
  );

  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();

    if (!form.validate()) return;

    const success = await saveCategory(form.toPayload(), editingId);
    if (success) {
      form.reset();
      setEditingId(null);
    }
  };

  const handleEdit = (category: Category) => {
    // Global category tidak boleh diedit
    if (category.userId === null) return;

    setEditingId(category.id);
    form.loadFromCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    const category = categories.find((c) => c.id === id);
    if (category?.userId === null) return;

    confirmDialog.confirm(
      "Hapus Kategori?",
      "Tindakan ini tidak bisa dibatalkan. Transaksi dengan kategori ini akan tetap tersimpan.",
      async () => {
        await deleteCategory(id);
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
        <p>Loading Categories...</p>
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
            <h1 className="text-2xl font-bold sm:text-3xl">Categories</h1>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              Manage your income and expense categories.
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

        <CategoryForm
          form={form.form}
          isEditing={!!editingId}
          saving={saving}
          onFieldChange={form.updateField}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />

        <CategoryGroup
          title="Income Categories"
          emptyText="No income categories yet."
          categories={incomeCategories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CategoryGroup
          title="Expense Categories"
          emptyText="No expense categories yet."
          categories={expenseCategories}
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

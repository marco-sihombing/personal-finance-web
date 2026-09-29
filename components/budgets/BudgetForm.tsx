"use client";

import { CurrencyInput } from "@/components/ui/CurrencyInput";
import type { BudgetFormValues, Category } from "@/types";

interface BudgetFormProps {
  form: BudgetFormValues;
  expenseCategories: Category[];
  isEditing: boolean;
  saving: boolean;
  onFieldChange: <K extends keyof BudgetFormValues>(
    field: K,
    value: BudgetFormValues[K],
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function BudgetForm({
  form,
  expenseCategories,
  isEditing,
  saving,
  onFieldChange,
  onSubmit,
  onCancel,
}: BudgetFormProps) {
  const noCategories = expenseCategories.length === 0;

  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        {isEditing ? "Edit Budget" : "Tambah Budget"}
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        {isEditing
          ? "Edit your budget details."
          : "Set a spending limit for a specific category."}
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <Field label="Kategori (Expense)">
          <select
            value={form.categoryId}
            onChange={(e) => onFieldChange("categoryId", e.target.value)}
            required
            disabled={noCategories}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200 disabled:bg-gray-100"
          >
            <option value="">Select an expense category</option>
            {expenseCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {noCategories && (
            <p className="mt-1 text-xs text-red-500">
              There are no expense categories yet. Create one first on the
              Categories page.
            </p>
          )}
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Budget Amount">
            <CurrencyInput
              value={form.amount}
              onChange={(v) => onFieldChange("amount", v)}
              required
              placeholder="2.000.000"
            />
          </Field>

          <Field label="Period Start">
            <input
              type="date"
              value={form.periodStart}
              onChange={(e) => onFieldChange("periodStart", e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
          </Field>

          <Field label="Period End">
            <input
              type="date"
              value={form.periodEnd}
              onChange={(e) => onFieldChange("periodEnd", e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
          </Field>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || noCategories}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-2 text-sm font-semibold text-gray-900 shadow-md shadow-amber-200 transition hover:from-amber-500 hover:to-yellow-600 active:scale-95 disabled:opacity-50"
          >
            {saving ? "Saving..." : isEditing ? "Update Budget" : "Add Budget"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}

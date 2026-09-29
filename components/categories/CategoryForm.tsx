"use client";

import type { CategoryFormValues, TransactionType } from "@/types";

const TYPE_OPTIONS: { value: TransactionType; label: string }[] = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
];

interface CategoryFormProps {
  form: CategoryFormValues;
  isEditing: boolean;
  saving: boolean;
  onFieldChange: <K extends keyof CategoryFormValues>(
    field: K,
    value: CategoryFormValues[K],
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function CategoryForm({
  form,
  isEditing,
  saving,
  onFieldChange,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        {isEditing ? "Edit Category" : "Tambah Category"}
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        {isEditing
          ? "Edit your category details."
          : "Create a category for your income and expense."}
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <Field label="Category Name">
          <input
            type="text"
            value={form.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="Food / Salary / Transportation"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
          />
        </Field>

        <Field label="Category Type">
          <select
            value={form.categoryType}
            onChange={(e) =>
              onFieldChange(
                "categoryType",
                e.target.value as CategoryFormValues["categoryType"],
              )
            }
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
          >
            <option value="">Select type</option>
            {TYPE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-2 text-sm font-semibold text-gray-900 shadow-md shadow-amber-200 transition hover:from-amber-500 hover:to-yellow-600 active:scale-95 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : isEditing
                ? "Update Category"
                : "Create Category"}
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

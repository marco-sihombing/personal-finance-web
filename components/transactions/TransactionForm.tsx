"use client";

import type {
  Account,
  Category,
  TransactionFormValues,
  TransactionType,
} from "@/types";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { formatRupiah } from "@/lib/utils/currency";

interface TransactionFormProps {
  form: TransactionFormValues;
  accounts: Account[];
  filteredCategories: Category[];
  isEditing: boolean;
  saving: boolean;
  onFieldChange: <K extends keyof TransactionFormValues>(
    field: K,
    value: TransactionFormValues[K],
  ) => void;
  onTypeChange: (type: TransactionType) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function TransactionForm({
  form,
  accounts,
  filteredCategories,
  isEditing,
  saving,
  onFieldChange,
  onTypeChange,
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        {isEditing ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Transaction Type">
          <select
            value={form.transactionType}
            onChange={(e) => onTypeChange(e.target.value as TransactionType)}
            className="w-full rounded-lg border px-4 py-2"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </Field>

        <Field label="Account">
          <select
            value={form.accountId}
            onChange={(e) => onFieldChange("accountId", e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-2"
          >
            <option value="">Select account</option>
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} — {formatRupiah(a.balance)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Category">
          <select
            value={form.categoryId}
            onChange={(e) => onFieldChange("categoryId", e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-2"
          >
            <option value="">Select category</option>
            {filteredCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {filteredCategories.length === 0 && (
            <p className="mt-1 text-sm text-red-500">
              No {form.transactionType} categories available. Please create one
              first.
            </p>
          )}
        </Field>

        <Field label="Amount">
          <CurrencyInput
            value={form.amount}
            onChange={(v) => onFieldChange("amount", v)}
            required
            placeholder="50.000"
          />
        </Field>

        <Field label="Transaction Date">
          <input
            type="date"
            value={form.transactionDate}
            onChange={(e) => onFieldChange("transactionDate", e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-2"
          />
        </Field>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => onFieldChange("description", e.target.value)}
            placeholder="Lunch at restaurant"
            rows={3}
            className="w-full rounded-lg border px-4 py-2"
          />
        </Field>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : isEditing
                ? "Update Transaction"
                : "Add Transaction"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border px-5 py-2 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
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
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

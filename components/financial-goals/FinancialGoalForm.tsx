"use client";

import { CurrencyInput } from "@/components/ui/CurrencyInput";
import type { FinancialGoalFormValues } from "@/types";

interface FinancialGoalFormProps {
  form: FinancialGoalFormValues;
  isEditing: boolean;
  saving: boolean;
  onFieldChange: <K extends keyof FinancialGoalFormValues>(
    field: K,
    value: FinancialGoalFormValues[K],
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function FinancialGoalForm({
  form,
  isEditing,
  saving,
  onFieldChange,
  onSubmit,
  onCancel,
}: FinancialGoalFormProps) {
  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        {isEditing ? "Edit Financial Goal" : "Buat Financial Goal"}
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        {isEditing ? "Change your goal details." : "Plan your financial goals."}
      </p>

      <form onSubmit={onSubmit} className="mt-5 grid gap-4 sm:grid-cols-3">
        <Field label="Goal Name">
          <input
            type="text"
            value={form.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="Example: Buy a laptop"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
          />
        </Field>

        <Field label="Target Amount">
          <CurrencyInput
            value={form.targetAmount}
            onChange={(v) => onFieldChange("targetAmount", v)}
            required
            placeholder="20.000.000"
          />
        </Field>

        <Field label="Target Date">
          <input
            type="date"
            value={form.targetDate}
            onChange={(e) => onFieldChange("targetDate", e.target.value)}
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
          />
        </Field>

        <div className="flex gap-3 sm:col-span-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-2 text-sm font-semibold text-gray-900 shadow-md shadow-amber-200 transition hover:from-amber-500 hover:to-yellow-600 active:scale-95 disabled:opacity-50"
          >
            {saving ? "Saving..." : isEditing ? "Update Goal" : "Create Goal"}
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

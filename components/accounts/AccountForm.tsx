"use client";

import type { AccountFormValues } from "@/types";

const ACCOUNT_TYPES = [
  { value: "bank", label: "Bank" },
  { value: "cash", label: "Cash" },
  { value: "e-wallet", label: "E-Wallet" },
];

interface AccountFormProps {
  form: AccountFormValues;
  isEditing: boolean;
  saving: boolean;
  onFieldChange: <K extends keyof AccountFormValues>(
    field: K,
    value: AccountFormValues[K],
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function AccountForm({
  form,
  isEditing,
  saving,
  onFieldChange,
  onSubmit,
  onCancel,
}: AccountFormProps) {
  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        {isEditing ? "Edit Account" : "Add Account"}
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        {isEditing ? "Change your account details." : "Add a new account."}
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <Field label="Account Name">
          <input
            type="text"
            value={form.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="BCA / Dompet / GoPay"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
          />
        </Field>

        <Field label="Account Type">
          <select
            value={form.accountType}
            onChange={(e) => onFieldChange("accountType", e.target.value)}
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
          >
            <option value="">Select account type</option>
            {ACCOUNT_TYPES.map((t) => (
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
                ? "Update Account"
                : "Add Account"}
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

"use client";

import { useCallback, useMemo, useState } from "react";
import type {
  Account,
  Category,
  CreateTransactionPayload,
  Transaction,
  TransactionFormValues,
  TransactionType,
} from "@/types";
import { formatRupiah, parseRupiahInput } from "@/lib/utils/currency";
import { useToast } from "@/hooks/useToast";

const today = () => new Date().toISOString().split("T")[0];

const emptyForm = (defaultAccountId = ""): TransactionFormValues => ({
  accountId: defaultAccountId,
  categoryId: "",
  transactionType: "expense",
  amount: "",
  transactionDate: today(),
  description: "",
});

interface UseTransactionFormOptions {
  accounts: Account[];
  categories: Category[];
  transactions: Transaction[];
  editingId: string | null;
}

export function useTransactionForm({
  accounts,
  categories,
  transactions,
  editingId,
}: UseTransactionFormOptions) {
  const { showToast } = useToast(); // ← tambah ini

  const [form, setForm] = useState<TransactionFormValues>(() =>
    emptyForm(accounts[0]?.id ?? ""),
  );

  const defaultAccountId = accounts[0]?.id ?? "";

  const filteredCategories = useMemo(
    () => categories.filter((c) => c.categoryType === form.transactionType),
    [categories, form.transactionType],
  );

  const effectiveBalance = useMemo(() => {
    const account = accounts.find((a) => a.id === form.accountId);
    if (!account) return 0;
    if (!editingId) return account.balance;

    const editing = transactions.find((t) => t.id === editingId);
    if (!editing) return account.balance;

    if (editing.accountId === form.accountId) {
      if (editing.transactionType === "expense") {
        return account.balance + editing.amount;
      }
      if (editing.transactionType === "income") {
        return account.balance - editing.amount;
      }
    }

    return account.balance;
  }, [accounts, transactions, form.accountId, editingId]);

  const updateField = useCallback(
    <K extends keyof TransactionFormValues>(
      field: K,
      value: TransactionFormValues[K],
    ) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const setTransactionType = useCallback((type: TransactionType) => {
    setForm((prev) => ({ ...prev, transactionType: type, categoryId: "" }));
  }, []);

  const reset = useCallback(() => {
    setForm(emptyForm(defaultAccountId));
  }, [defaultAccountId]);

  const loadFromTransaction = useCallback((t: Transaction) => {
    setForm({
      accountId: t.accountId,
      categoryId: t.categoryId,
      transactionType: t.transactionType,
      amount: t.amount.toString(),
      transactionDate: t.transactionDate.split("T")[0],
      description: t.description ?? "",
    });
  }, []);

  const validate = useCallback((): boolean => {
    const fail = (msg: string) => {
      showToast(msg, "error");
      return false;
    };

    if (!form.accountId) return fail("Silakan pilih akun.");
    if (!form.categoryId) return fail("Silakan pilih kategori.");

    const amount = parseRupiahInput(form.amount);
    if (amount <= 0) return fail("Jumlah harus lebih dari nol.");
    if (!form.transactionDate) return fail("Tanggal transaksi wajib diisi.");

    if (form.transactionType === "expense" && amount > effectiveBalance) {
      return fail(
        `Saldo akun tidak cukup. Saldo tersedia: ${formatRupiah(effectiveBalance)}.`,
      );
    }

    return true;
  }, [form, effectiveBalance, showToast]);

  const toPayload = useCallback((): CreateTransactionPayload => {
    return {
      accountId: form.accountId,
      categoryId: form.categoryId,
      transactionType: form.transactionType,
      amount: parseRupiahInput(form.amount),
      transactionDate: new Date(
        `${form.transactionDate}T00:00:00`,
      ).toISOString(),
      description: form.description.trim() || null,
    };
  }, [form]);

  return {
    form,
    updateField,
    setTransactionType,
    reset,
    loadFromTransaction,
    validate,
    toPayload,
    filteredCategories,
    effectiveBalance,
  };
}

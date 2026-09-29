"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { accountsApi } from "@/lib/api/accounts.api";
import { categoriesApi } from "@/lib/api/categories.api";
import { transactionsApi } from "@/lib/api/transactions.api";
import { UnauthorizedError } from "@/lib/api/client";
import { useToast } from "@/hooks/useToast";
import type {
  Account,
  Category,
  CreateTransactionPayload,
  Transaction,
} from "@/types";

interface UseTransactionsResult {
  transactions: Transaction[];
  accounts: Account[];
  categories: Category[];
  loading: boolean;
  saving: boolean;
  reload: () => Promise<void>;
  saveTransaction: (
    payload: CreateTransactionPayload,
    editingId?: string | null,
  ) => Promise<boolean>;
  deleteTransaction: (id: string) => Promise<boolean>;
}

export function useTransactions(): UseTransactionsResult {
  const router = useRouter();
  const { showToast } = useToast();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    try {
      setLoading(true);

      const [tx, acc, cat] = await Promise.all([
        transactionsApi.list(),
        accountsApi.list(),
        categoriesApi.list(),
      ]);

      setTransactions(tx);
      setAccounts(acc);
      setCategories(cat);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        router.replace("/");
        return;
      }
      showToast("Gagal memuat data transaksi.", "error");
    } finally {
      setLoading(false);
    }
  }, [router, showToast]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const saveTransaction = useCallback(
    async (
      payload: CreateTransactionPayload,
      editingId?: string | null,
    ): Promise<boolean> => {
      try {
        setSaving(true);

        if (editingId) {
          await transactionsApi.update(editingId, payload);
          showToast("Transaksi berhasil diperbarui.", "success");
        } else {
          await transactionsApi.create(payload);
          showToast("Transaksi berhasil ditambahkan.", "success");
        }

        await reload();
        return true;
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          router.replace("/");
          return false;
        }
        showToast(
          error instanceof Error ? error.message : "Gagal menyimpan transaksi.",
          "error",
        );
        return false;
      } finally {
        setSaving(false);
      }
    },
    [reload, router, showToast],
  );

  const deleteTransaction = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await transactionsApi.remove(id);
        showToast("Transaksi berhasil dihapus.", "success");
        await reload();
        return true;
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          router.replace("/");
          return false;
        }
        showToast(
          error instanceof Error ? error.message : "Gagal menghapus transaksi.",
          "error",
        );
        return false;
      }
    },
    [reload, router, showToast],
  );

  return {
    transactions,
    accounts,
    categories,
    loading,
    saving,
    reload,
    saveTransaction,
    deleteTransaction,
  };
}

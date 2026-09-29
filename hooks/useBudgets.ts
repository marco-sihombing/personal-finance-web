"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { budgetsApi } from "@/lib/api/budgets.api";
import { categoriesApi } from "@/lib/api/categories.api";
import { transactionsApi } from "@/lib/api/transactions.api";
import { UnauthorizedError } from "@/lib/api/client";
import { useToast } from "@/hooks/useToast";
import type {
  Budget,
  Category,
  CreateBudgetPayload,
  Transaction,
} from "@/types";

interface UseBudgetsResult {
  budgets: Budget[];
  categories: Category[];
  transactions: Transaction[];
  loading: boolean;
  saving: boolean;
  reload: () => Promise<void>;
  saveBudget: (
    payload: CreateBudgetPayload,
    editingId?: string | null,
  ) => Promise<boolean>;
  deleteBudget: (id: string) => Promise<boolean>;
}

export function useBudgets(): UseBudgetsResult {
  const router = useRouter();
  const { showToast } = useToast();

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    try {
      setLoading(true);

      const [b, c, t] = await Promise.all([
        budgetsApi.list(),
        categoriesApi.list(),
        transactionsApi.list(),
      ]);

      setBudgets(b);
      setCategories(c);
      setTransactions(t);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        router.replace("/");
        return;
      }
      showToast("Gagal memuat data budget.", "error");
    } finally {
      setLoading(false);
    }
  }, [router, showToast]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const saveBudget = useCallback(
    async (
      payload: CreateBudgetPayload,
      editingId?: string | null,
    ): Promise<boolean> => {
      try {
        setSaving(true);

        if (editingId) {
          await budgetsApi.update(editingId, payload);
          showToast("Budget berhasil diperbarui.", "success");
        } else {
          await budgetsApi.create(payload);
          showToast("Budget berhasil dibuat.", "success");
        }

        await reload();
        return true;
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          router.replace("/");
          return false;
        }
        showToast(
          error instanceof Error ? error.message : "Gagal menyimpan budget.",
          "error",
        );
        return false;
      } finally {
        setSaving(false);
      }
    },
    [reload, router, showToast],
  );

  const deleteBudget = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await budgetsApi.remove(id);
        showToast("Budget berhasil dihapus.", "success");
        await reload();
        return true;
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          router.replace("/");
          return false;
        }
        showToast(
          error instanceof Error ? error.message : "Gagal menghapus budget.",
          "error",
        );
        return false;
      }
    },
    [reload, router, showToast],
  );

  return {
    budgets,
    categories,
    transactions,
    loading,
    saving,
    reload,
    saveBudget,
    deleteBudget,
  };
}

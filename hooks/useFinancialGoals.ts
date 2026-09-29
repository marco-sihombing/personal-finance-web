"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { financialGoalsApi } from "@/lib/api/financial-goals.api";
import { UnauthorizedError } from "@/lib/api/client";
import { useToast } from "@/hooks/useToast";
import type { CreateFinancialGoalPayload, FinancialGoalEntity } from "@/types";

interface UseFinancialGoalsResult {
  goals: FinancialGoalEntity[];
  loading: boolean;
  saving: boolean;
  reload: () => Promise<void>;
  saveGoal: (
    payload: CreateFinancialGoalPayload,
    editingId?: string | null,
  ) => Promise<boolean>;
  deleteGoal: (id: string) => Promise<boolean>;
}

export function useFinancialGoals(): UseFinancialGoalsResult {
  const router = useRouter();
  const { showToast } = useToast();

  const [goals, setGoals] = useState<FinancialGoalEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const data = await financialGoalsApi.list();
      setGoals(data);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        router.replace("/");
        return;
      }
      showToast("Gagal memuat data financial goals.", "error");
    } finally {
      setLoading(false);
    }
  }, [router, showToast]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const saveGoal = useCallback(
    async (
      payload: CreateFinancialGoalPayload,
      editingId?: string | null,
    ): Promise<boolean> => {
      try {
        setSaving(true);

        if (editingId) {
          await financialGoalsApi.update(editingId, payload);
          showToast("Financial goal berhasil diperbarui.", "success");
        } else {
          await financialGoalsApi.create(payload);
          showToast("Financial goal berhasil dibuat.", "success");
        }

        await reload();
        return true;
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          router.replace("/");
          return false;
        }
        showToast(
          error instanceof Error
            ? error.message
            : "Gagal menyimpan financial goal.",
          "error",
        );
        return false;
      } finally {
        setSaving(false);
      }
    },
    [reload, router, showToast],
  );

  const deleteGoal = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await financialGoalsApi.remove(id);
        showToast("Financial goal berhasil dihapus.", "success");
        await reload();
        return true;
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          router.replace("/");
          return false;
        }
        showToast(
          error instanceof Error
            ? error.message
            : "Gagal menghapus financial goal.",
          "error",
        );
        return false;
      }
    },
    [reload, router, showToast],
  );

  return { goals, loading, saving, reload, saveGoal, deleteGoal };
}

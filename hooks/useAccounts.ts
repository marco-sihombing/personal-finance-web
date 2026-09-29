"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { accountsApi } from "@/lib/api/accounts.api";
import { UnauthorizedError } from "@/lib/api/client";
import { useToast } from "@/hooks/useToast";
import type { Account, CreateAccountPayload } from "@/types";

interface UseAccountsResult {
  accounts: Account[];
  loading: boolean;
  saving: boolean;
  reload: () => Promise<void>;
  saveAccount: (
    payload: CreateAccountPayload,
    editingId?: string | null,
  ) => Promise<boolean>;
  deleteAccount: (id: string) => Promise<boolean>;
}

export function useAccounts(): UseAccountsResult {
  const router = useRouter();
  const { showToast } = useToast();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const data = await accountsApi.list();
      setAccounts(data);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        router.replace("/");
        return;
      }
      showToast("Gagal memuat data akun.", "error");
    } finally {
      setLoading(false);
    }
  }, [router, showToast]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const saveAccount = useCallback(
    async (
      payload: CreateAccountPayload,
      editingId?: string | null,
    ): Promise<boolean> => {
      try {
        setSaving(true);

        if (editingId) {
          await accountsApi.update(editingId, payload);
          showToast("Akun berhasil diperbarui.", "success");
        } else {
          await accountsApi.create(payload);
          showToast("Akun berhasil ditambahkan.", "success");
        }

        await reload();
        return true;
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          router.replace("/");
          return false;
        }
        showToast(
          error instanceof Error ? error.message : "Gagal menyimpan akun.",
          "error",
        );
        return false;
      } finally {
        setSaving(false);
      }
    },
    [reload, router, showToast],
  );

  const deleteAccount = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await accountsApi.remove(id);
        showToast("Akun berhasil dihapus.", "success");
        await reload();
        return true;
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          router.replace("/");
          return false;
        }
        showToast(
          error instanceof Error ? error.message : "Gagal menghapus akun.",
          "error",
        );
        return false;
      }
    },
    [reload, router, showToast],
  );

  return { accounts, loading, saving, reload, saveAccount, deleteAccount };
}

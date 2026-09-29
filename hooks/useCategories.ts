"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { categoriesApi } from "@/lib/api/categories.api";
import { UnauthorizedError } from "@/lib/api/client";
import { useToast } from "@/hooks/useToast";
import type { Category, CreateCategoryPayload } from "@/types";

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  saving: boolean;
  reload: () => Promise<void>;
  saveCategory: (
    payload: CreateCategoryPayload,
    editingId?: string | null,
  ) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
}

export function useCategories(): UseCategoriesResult {
  const router = useRouter();
  const { showToast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const data = await categoriesApi.list();
      setCategories(data);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        router.replace("/");
        return;
      }
      showToast("Gagal memuat data kategori.", "error");
    } finally {
      setLoading(false);
    }
  }, [router, showToast]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const saveCategory = useCallback(
    async (
      payload: CreateCategoryPayload,
      editingId?: string | null,
    ): Promise<boolean> => {
      try {
        setSaving(true);

        if (editingId) {
          await categoriesApi.update(editingId, payload);
          showToast("Kategori berhasil diperbarui.", "success");
        } else {
          await categoriesApi.create(payload);
          showToast("Kategori berhasil dibuat.", "success");
        }

        await reload();
        return true;
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          router.replace("/");
          return false;
        }
        showToast(
          error instanceof Error ? error.message : "Gagal menyimpan kategori.",
          "error",
        );
        return false;
      } finally {
        setSaving(false);
      }
    },
    [reload, router, showToast],
  );

  const deleteCategory = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await categoriesApi.remove(id);
        showToast("Kategori berhasil dihapus.", "success");
        await reload();
        return true;
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          router.replace("/");
          return false;
        }
        showToast(
          error instanceof Error ? error.message : "Gagal menghapus kategori.",
          "error",
        );
        return false;
      }
    },
    [reload, router, showToast],
  );

  return { categories, loading, saving, reload, saveCategory, deleteCategory };
}

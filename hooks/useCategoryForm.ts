"use client";

import { useCallback, useState } from "react";
import { useToast } from "@/hooks/useToast";
import type {
  Category,
  CategoryFormValues,
  CreateCategoryPayload,
  TransactionType,
} from "@/types";

const emptyForm = (): CategoryFormValues => ({
  name: "",
  categoryType: "",
});

export function useCategoryForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState<CategoryFormValues>(() => emptyForm());

  const updateField = useCallback(
    <K extends keyof CategoryFormValues>(
      field: K,
      value: CategoryFormValues[K],
    ) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const reset = useCallback(() => {
    setForm(emptyForm());
  }, []);

  const loadFromCategory = useCallback((category: Category) => {
    setForm({
      name: category.name,
      categoryType: category.categoryType,
    });
  }, []);

  const validate = useCallback((): boolean => {
    const fail = (msg: string) => {
      showToast(msg, "error");
      return false;
    };

    if (!form.name.trim()) return fail("The category name is required.");
    if (form.name.trim().length < 2)
      return fail("The category name must be at least 2 characters long.");
    if (!form.categoryType)
      return fail("Please select a category type (income/expense).");

    return true;
  }, [form, showToast]);

  const toPayload = useCallback((): CreateCategoryPayload => {
    return {
      name: form.name.trim(),
      categoryType: form.categoryType as TransactionType,
    };
  }, [form]);

  return {
    form,
    updateField,
    reset,
    loadFromCategory,
    validate,
    toPayload,
  };
}

"use client";

import { useCallback, useMemo, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { parseRupiahInput } from "@/lib/utils/currency";
import type {
  Budget,
  BudgetFormValues,
  Category,
  CreateBudgetPayload,
} from "@/types";

const emptyForm = (): BudgetFormValues => ({
  categoryId: "",
  amount: "",
  periodStart: "",
  periodEnd: "",
});

interface UseBudgetFormOptions {
  categories: Category[];
}

export function useBudgetForm({ categories }: UseBudgetFormOptions) {
  const { showToast } = useToast();
  const [form, setForm] = useState<BudgetFormValues>(() => emptyForm());

  const expenseCategories = useMemo(
    () => categories.filter((c) => c.categoryType === "expense"),
    [categories],
  );

  const updateField = useCallback(
    <K extends keyof BudgetFormValues>(
      field: K,
      value: BudgetFormValues[K],
    ) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const reset = useCallback(() => {
    setForm(emptyForm());
  }, []);

  const loadFromBudget = useCallback((budget: Budget) => {
    setForm({
      categoryId: budget.categoryId,
      amount: budget.amount.toString(),
      periodStart: budget.periodStart.split("T")[0],
      periodEnd: budget.periodEnd.split("T")[0],
    });
  }, []);

  const validate = useCallback((): boolean => {
    const fail = (msg: string) => {
      showToast(msg, "error");
      return false;
    };

    if (!form.categoryId) return fail("Silakan pilih kategori.");
    if (expenseCategories.length === 0)
      return fail(
        "There are no expense categories yet. Create one first on the Categories page.",
      );

    const amount = parseRupiahInput(form.amount);
    if (amount <= 0)
      return fail("The budget amount must be greater than zero.");

    if (!form.periodStart || !form.periodEnd)
      return fail("Period start and end are required.");

    if (form.periodStart >= form.periodEnd)
      return fail("Period start must be before period end.");

    return true;
  }, [form, expenseCategories.length, showToast]);

  const toPayload = useCallback((): CreateBudgetPayload => {
    return {
      categoryId: form.categoryId,
      amount: parseRupiahInput(form.amount),
      periodStart: new Date(`${form.periodStart}T00:00:00`).toISOString(),
      periodEnd: new Date(`${form.periodEnd}T23:59:59`).toISOString(),
    };
  }, [form]);

  return {
    form,
    updateField,
    reset,
    loadFromBudget,
    validate,
    toPayload,
    expenseCategories,
  };
}

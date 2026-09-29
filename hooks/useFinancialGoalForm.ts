"use client";

import { useCallback, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { parseRupiahInput } from "@/lib/utils/currency";
import type {
  CreateFinancialGoalPayload,
  FinancialGoalEntity,
  FinancialGoalFormValues,
} from "@/types";

const emptyForm = (): FinancialGoalFormValues => ({
  name: "",
  targetAmount: "",
  targetDate: "",
});

export function useFinancialGoalForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState<FinancialGoalFormValues>(() => emptyForm());

  const updateField = useCallback(
    <K extends keyof FinancialGoalFormValues>(
      field: K,
      value: FinancialGoalFormValues[K],
    ) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const reset = useCallback(() => {
    setForm(emptyForm());
  }, []);

  const loadFromGoal = useCallback((goal: FinancialGoalEntity) => {
    setForm({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      targetDate: goal.targetDate ? goal.targetDate.substring(0, 10) : "",
    });
  }, []);

  const validate = useCallback((): boolean => {
    const fail = (msg: string) => {
      showToast(msg, "error");
      return false;
    };

    if (!form.name.trim()) return fail("The goal name is required..");
    if (form.name.trim().length < 2)
      return fail("The goal name must be at least 2 characters long.");

    const amount = parseRupiahInput(form.targetAmount);
    if (amount <= 0) return fail("Target amount harus lebih dari nol.");

    if (!form.targetDate) return fail("The target date is a required field.");

    return true;
  }, [form, showToast]);

  const toPayload = useCallback((): CreateFinancialGoalPayload => {
    return {
      name: form.name.trim(),
      targetAmount: parseRupiahInput(form.targetAmount),
      targetDate: form.targetDate,
    };
  }, [form]);

  return {
    form,
    updateField,
    reset,
    loadFromGoal,
    validate,
    toPayload,
  };
}

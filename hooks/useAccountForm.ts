"use client";

import { useCallback, useState } from "react";
import { useToast } from "@/hooks/useToast";
import type { Account, AccountFormValues, CreateAccountPayload } from "@/types";

const emptyForm = (): AccountFormValues => ({
  name: "",
  accountType: "",
});

export function useAccountForm() {
  const { showToast } = useToast();

  const [form, setForm] = useState<AccountFormValues>(() => emptyForm());

  const updateField = useCallback(
    <K extends keyof AccountFormValues>(
      field: K,
      value: AccountFormValues[K],
    ) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const reset = useCallback(() => {
    setForm(emptyForm());
  }, []);

  const loadFromAccount = useCallback((account: Account) => {
    setForm({
      name: account.name,
      accountType: account.accountType,
    });
  }, []);

  const validate = useCallback((): boolean => {
    const fail = (msg: string) => {
      showToast(msg, "error");
      return false;
    };

    if (!form.name.trim()) return fail("Nama akun wajib diisi.");
    if (form.name.trim().length < 2)
      return fail("Nama akun minimal 2 karakter.");
    if (!form.accountType) return fail("Silakan pilih tipe akun.");

    return true;
  }, [form, showToast]);

  const toPayload = useCallback((): CreateAccountPayload => {
    return {
      name: form.name.trim(),
      accountType: form.accountType,
      balance: 0,
    };
  }, [form]);

  return {
    form,
    updateField,
    reset,
    loadFromAccount,
    validate,
    toPayload,
  };
}

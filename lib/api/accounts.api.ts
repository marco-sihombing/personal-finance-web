import { apiRequest } from "./client";
import type { Account, CreateAccountPayload } from "@/types";

export const accountsApi = {
  list: () => apiRequest<Account[]>("/Accounts"),

  create: (payload: CreateAccountPayload) =>
    apiRequest<Account>("/Accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: CreateAccountPayload) =>
    apiRequest<Account>(`/Accounts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  remove: (id: string) =>
    apiRequest<void>(`/Accounts/${id}`, {
      method: "DELETE",
    }),
};

import { apiRequest } from "./client";
import type { CreateTransactionPayload, Transaction } from "@/types";

export const transactionsApi = {
  list: () => apiRequest<Transaction[]>("/Transactions"),

  create: (payload: CreateTransactionPayload) =>
    apiRequest<Transaction>("/Transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: CreateTransactionPayload) =>
    apiRequest<Transaction>(`/Transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  remove: (id: string) =>
    apiRequest<void>(`/Transactions/${id}`, {
      method: "DELETE",
    }),
};

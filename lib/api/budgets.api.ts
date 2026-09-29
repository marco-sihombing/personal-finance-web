import { apiRequest } from "./client";
import type { Budget, CreateBudgetPayload } from "@/types";

export const budgetsApi = {
  list: () => apiRequest<Budget[]>("/Budgets"),

  create: (payload: CreateBudgetPayload) =>
    apiRequest<Budget>("/Budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: CreateBudgetPayload) =>
    apiRequest<Budget>(`/Budgets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  remove: (id: string) =>
    apiRequest<void>(`/Budgets/${id}`, {
      method: "DELETE",
    }),
};

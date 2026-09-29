import { apiRequest } from "./client";
import type { CreateFinancialGoalPayload, FinancialGoalEntity } from "@/types";

export const financialGoalsApi = {
  list: () => apiRequest<FinancialGoalEntity[]>("/FinancialGoals"),

  create: (payload: CreateFinancialGoalPayload) =>
    apiRequest<FinancialGoalEntity>("/FinancialGoals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: CreateFinancialGoalPayload) =>
    apiRequest<FinancialGoalEntity>(`/FinancialGoals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  remove: (id: string) =>
    apiRequest<void>(`/FinancialGoals/${id}`, {
      method: "DELETE",
    }),
};

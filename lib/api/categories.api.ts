import { apiRequest } from "./client";
import type { Category, CreateCategoryPayload } from "@/types";

export const categoriesApi = {
  list: () => apiRequest<Category[]>("/Categories"),

  create: (payload: CreateCategoryPayload) =>
    apiRequest<Category>("/Categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: CreateCategoryPayload) =>
    apiRequest<Category>(`/Categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  remove: (id: string) =>
    apiRequest<void>(`/Categories/${id}`, {
      method: "DELETE",
    }),
};

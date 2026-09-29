import type { Category as CategoryEntity } from "./entity.types";

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  category: CategoryEntity;
  amount: number;
  periodStart: string;
  periodEnd: string;
  createdAt: string;
}

export interface BudgetFormValues {
  categoryId: string;
  amount: string;
  periodStart: string;
  periodEnd: string;
}

export interface CreateBudgetPayload {
  categoryId: string;
  amount: number;
  periodStart: string;
  periodEnd: string;
}

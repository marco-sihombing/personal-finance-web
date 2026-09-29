import type { FinancialGoal as FinancialGoalEntity } from "./entity.types";

export type { FinancialGoalEntity };

export interface FinancialGoalFormValues {
  name: string;
  targetAmount: string;
  targetDate: string;
}

export interface CreateFinancialGoalPayload {
  name: string;
  targetAmount: number;
  targetDate: string;
}

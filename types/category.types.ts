import type {
  Category as CategoryEntity,
  TransactionType,
} from "./entity.types";

export type { CategoryEntity };

export interface CategoryFormValues {
  name: string;
  categoryType: TransactionType | "";
}

export interface CreateCategoryPayload {
  name: string;
  categoryType: TransactionType;
}

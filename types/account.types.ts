import type { Account } from "./entity.types";

export type { Account };

export interface AccountFormValues {
  name: string;
  accountType: string;
}

export interface CreateAccountPayload {
  name: string;
  accountType: string;
  balance?: number;
}

import { apiRequest } from "./client";
import type { User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = {
  me: () => apiRequest<User>("/Auth/me"),

  logout: () =>
    apiRequest<void>("/Auth/logout", {
      method: "POST",
      throwOnUnauthorized: false,
    }),

  getGoogleLoginUrl: () => `${API_URL}/Auth/google`,
};

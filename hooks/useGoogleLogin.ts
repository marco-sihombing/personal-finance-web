"use client";

import { useCallback } from "react";
import { authApi } from "@/lib/api/auth.api";

export function useGoogleLogin() {
  return useCallback(() => {
    window.location.href = authApi.getGoogleLoginUrl();
  }, []);
}

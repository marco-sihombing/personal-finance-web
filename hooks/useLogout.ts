"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";

export function useLogout() {
  const router = useRouter();

  return useCallback(async () => {
    try {
      await authApi.logout();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [router]);
}

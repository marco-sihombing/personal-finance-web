"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";

export function useSessionRedirect() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        await authApi.me();
        if (cancelled) return;
        router.replace("/dashboard");
      } catch {
        // Belum login / session invalid — biarkan halaman tampil
      }
    };

    void check();

    return () => {
      cancelled = true;
    };
  }, [router]);
}

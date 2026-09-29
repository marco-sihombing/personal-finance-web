"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";
import { UnauthorizedError } from "@/lib/api/client";

export type AuthCallbackStatus = "loading" | "success" | "error";

interface UseAuthCallbackResult {
  status: AuthCallbackStatus;
  error: string;
}

export function useAuthCallback(): UseAuthCallbackResult {
  const router = useRouter();
  const [status, setStatus] = useState<AuthCallbackStatus>("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      try {
        await authApi.me();
        if (cancelled) return;

        setStatus("success");

        // Redirect setelah delay singkat biar user lihat animasi sukses
        setTimeout(() => {
          router.replace("/dashboard");
        }, 800);
      } catch (err) {
        if (cancelled) return;

        // 401 atau error apa pun → anggap gagal, redirect ke login
        if (err instanceof UnauthorizedError) {
          setError("Sesi login tidak valid atau sudah kedaluwarsa.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Gagal memverifikasi login.");
        }

        setStatus("error");

        // Redirect ke login setelah delay
        setTimeout(() => {
          router.replace("/");
        }, 1500);
      }
    };

    void verify();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return { status, error };
}

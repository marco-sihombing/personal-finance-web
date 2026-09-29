"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";
import { dashboardApi } from "@/lib/api/dashboard.api";
import { UnauthorizedError } from "@/lib/api/client";
import type { DashboardData, User } from "@/types";

interface UseDashboardResult {
  user: User | null;
  dashboard: DashboardData | null;
  loading: boolean;
  error: string;
  reload: () => void;
}

export function useDashboard(): UseDashboardResult {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [userData, dashboardData] = await Promise.all([
          authApi.me(),
          dashboardApi.get(),
        ]);

        if (cancelled) return;
        setUser(userData);
        setDashboard(dashboardData);
      } catch (err) {
        if (cancelled) return;

        if (err instanceof UnauthorizedError) {
          router.replace("/");
          return;
        }

        console.error("Error loading dashboard:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard.",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, [router, reloadKey]);

  return { user, dashboard, loading, error, reload };
}

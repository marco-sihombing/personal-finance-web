"use client";

import { useAuthCallback } from "@/hooks/useAuthCallback";
import { AuthCallbackStatus } from "@/components/auth/AuthCallbackStatus";

export default function GoogleCallbackPage() {
  const { status, error } = useAuthCallback();

  return <AuthCallbackStatus status={status} error={error} />;
}

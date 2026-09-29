"use client";

import { useSessionRedirect } from "@/hooks/useSessionRedirect";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import { LoginHero } from "@/components/auth/LoginHero";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";

export default function Home() {
  useSessionRedirect();
  const loginWithGoogle = useGoogleLogin();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 px-4">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-yellow-300/40 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-amber-300/40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-yellow-200/70 bg-white/90 p-8 shadow-xl shadow-yellow-200/40 backdrop-blur-md sm:p-10">
          <LoginHero />

          <GoogleLoginButton onClick={loginWithGoogle} />

          <p className="mt-6 text-center text-xs text-gray-400">
            By logging in, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import type { AuthCallbackStatus } from "@/hooks/useAuthCallback";

interface AuthCallbackStatusProps {
  status: AuthCallbackStatus;
  error?: string;
}

export function AuthCallbackStatus({ status, error }: AuthCallbackStatusProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 p-6">
      <DecorativeBackground />

      <div className="relative z-10 w-full max-w-sm">
        {status === "loading" && <LoadingCard />}
        {status === "success" && <SuccessCard />}
        {status === "error" && <ErrorCard error={error} />}
      </div>
    </main>
  );
}

/* ---------- Cards ---------- */

function LoadingCard() {
  return (
    <div className="rounded-2xl border border-yellow-200/70 bg-white/90 p-8 text-center shadow-xl shadow-yellow-200/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-amber-300/50">
        <SpinnerIcon />
      </div>
      <h1 className="mt-5 text-lg font-semibold text-gray-900">
        Memverifikasi login...
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Mohon tunggu sebentar, kami sedang menyiapkan dashboard Anda.
      </p>
    </div>
  );
}

function SuccessCard() {
  return (
    <div className="rounded-2xl border border-green-200/70 bg-white/90 p-8 text-center shadow-xl shadow-green-200/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-300/50">
        <CheckIcon />
      </div>
      <h1 className="mt-5 text-lg font-semibold text-gray-900">
        Login Berhasil! 🎉
      </h1>
      <p className="mt-1 text-sm text-gray-500">Mengarahkan ke dashboard...</p>
    </div>
  );
}

function ErrorCard({ error }: { error?: string }) {
  return (
    <div className="rounded-2xl border border-red-200/70 bg-white/90 p-8 text-center shadow-xl shadow-red-200/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-rose-500 shadow-lg shadow-red-300/50">
        <CrossIcon />
      </div>
      <h1 className="mt-5 text-lg font-semibold text-gray-900">Login Gagal</h1>
      <p className="mt-1 text-sm text-gray-500">
        {error ?? "Terjadi kesalahan saat login."}
      </p>
      <p className="mt-3 text-xs text-gray-400">
        Mengarahkan kembali ke halaman login...
      </p>
    </div>
  );
}

/* ---------- Decorative background ---------- */

function DecorativeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-yellow-300/40 blur-3xl" />
      <div className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-amber-300/40 blur-3xl" />
    </div>
  );
}

/* ---------- Icons ---------- */

function SpinnerIcon() {
  return (
    <svg
      className="h-8 w-8 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useLogout } from "@/hooks/useLogout";
import { getInitials } from "@/lib/utils/initials";
import type { User } from "@/types";

interface DashboardHeaderProps {
  user: User;
}

const MENU_ITEMS = [
  { label: "Profil Saya", path: "/profile", icon: "user" },
  { label: "Pengaturan", path: "/settings", icon: "settings" },
] as const;

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter();
  const logout = useLogout();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);

  const initials = getInitials(user.fullName);

  const handleNavigate = (path: string) => {
    setMenuOpen(false);
    router.push(path);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    // 🔑 isolate + z-30 supaya seluruh header jadi stacking context
    //    yang LEBIH TINGGI dari konten di bawahnya
    <header className="relative isolate z-30 rounded-2xl border border-yellow-200/70 bg-white/80 px-4 py-3 shadow-lg shadow-yellow-200/40 backdrop-blur-md sm:px-6 sm:py-4">
      <div className="flex items-center justify-between gap-3">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-md shadow-amber-300/50 sm:h-11 sm:w-11">
            <ShieldIcon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold tracking-tight text-gray-900 sm:text-lg lg:text-xl">
              Personal Finance
            </h1>
          </div>
        </div>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu profil"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-sm font-bold text-white shadow-md shadow-amber-300/50 ring-2 ring-white transition hover:scale-105 hover:shadow-lg active:scale-95 sm:h-11 sm:w-11"
          >
            {initials}
          </button>

          {menuOpen && (
            <ProfileDropdown
              user={user}
              initials={initials}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </header>
  );
}

/* ---------- Sub-components ---------- */

interface ProfileDropdownProps {
  user: User;
  initials: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

function ProfileDropdown({
  user,
  initials,
  onNavigate,
  onLogout,
}: ProfileDropdownProps) {
  return (
    <div
      role="menu"
      // 🔑 z-[60] harus lebih tinggi dari header (z-30) + konten lain
      className="absolute right-0 z-[60] mt-2 w-64 origin-top-right animate-dropdown-in rounded-2xl border border-yellow-200/70 bg-white/95 shadow-xl shadow-yellow-200/50 backdrop-blur-md"
    >
      {/* Header user */}
      <div className="rounded-t-2xl border-b border-yellow-100 bg-gradient-to-br from-yellow-50 to-amber-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-sm font-bold text-white shadow-sm">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user.fullName}
            </p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="p-2">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.path}
            role="menuitem"
            onClick={() => onNavigate(item.path)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-yellow-50"
          >
            <MenuItemIcon name={item.icon} />
            {item.label}
          </button>
        ))}

        <div className="my-1 border-t border-yellow-100" />

        <button
          role="menuitem"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogoutIcon />
          Logout
        </button>
      </div>
    </div>
  );
}

/* ---------- Icons (tidak berubah) ---------- */

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 12.5l1.8 1.8 3.7-3.8"
      />
    </svg>
  );
}

function MenuItemIcon({ name }: { name: "user" | "settings" }) {
  const cls = "h-4 w-4 text-amber-600";
  if (name === "user") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cls}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}

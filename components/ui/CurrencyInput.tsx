"use client";

import { useEffect, useState } from "react";
import { formatRupiahInput, parseRupiahInput } from "@/lib/utils/currency";

interface CurrencyInputProps {
  value: string; // nilai mentah (angka asli sebagai string)
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function CurrencyInput({
  value,
  onChange,
  placeholder = "0",
  required,
  className = "",
}: CurrencyInputProps) {
  const [display, setDisplay] = useState("");

  // Sync display saat value berubah dari luar
  useEffect(() => {
    const numeric = parseRupiahInput(value);
    setDisplay(numeric ? formatRupiahInput(numeric) : "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const numeric = parseRupiahInput(raw);

    setDisplay(numeric ? formatRupiahInput(numeric) : "");
    onChange(numeric ? numeric.toString() : "");
  };

  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm font-medium text-gray-500">
        Rp
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={display}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-lg border py-2 pr-4 pl-10 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 ${className}`}
      />
    </div>
  );
}

export const formatRupiah = (value: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

/**
 * Parse string input user jadi angka murni.
 * Handle "1.000.000", "1000000", "1,000,000", "Rp 1.000.000" → 1000000
 */
export const parseRupiahInput = (input: string): number => {
  const cleaned = input.replace(/[^\d]/g, "");
  if (!cleaned) return 0;
  return Number(cleaned);
};

/**
 * Format angka jadi string ribuan untuk ditampilkan di input.
 * 1000000 → "1.000.000"
 */
export const formatRupiahInput = (value: number): string => {
  if (!value) return "";
  return new Intl.NumberFormat("id-ID").format(value);
};

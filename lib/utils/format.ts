export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (date: string | null): string => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID");
};

export const getGoalProgress = (
  currentAmount: number,
  targetAmount: number,
): number => {
  if (targetAmount <= 0) return 0;
  return Math.min((currentAmount / targetAmount) * 100, 100);
};

export const getBudgetProgress = (actual: number, amount: number): number => {
  if (amount <= 0) return 0;
  return Math.min((actual / amount) * 100, 100);
};
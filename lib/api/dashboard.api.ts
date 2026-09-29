import { apiRequest } from "./client";
import type { DashboardData } from "@/types";

export const dashboardApi = {
  get: () => apiRequest<DashboardData>("/Dashboard"),
};
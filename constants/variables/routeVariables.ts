import { requiredEnv } from "~/utils/envHandlers";

// ===== DEFINE ROUTE VARIABLES =====
export const routeVariables = {
  baseUrl: requiredEnv("BASE_URL"),
  APIUrl: requiredEnv("API_URL"),
};

import {
  APIRequestContext,
  request as playwrightRequest,
} from "@playwright/test";
import { logger } from "~/utils/logger";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchApiOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: unknown;
  timeout?: number;
}

// Options Of Method Helpers (method Is Fixed By The Helper)
type MethodOptions = Omit<FetchApiOptions, "method" | "data">;
type MethodOptionsWithBody = Omit<FetchApiOptions, "method">;

// ===== FETCH API FUNCTION =====
export const fetchApi = async <T = unknown>(
  url: string,
  options: FetchApiOptions = {},
  request?: APIRequestContext,
): Promise<T> => {
  const { method = "GET", ...rest } = options;

  // Use The Given Request Context Or Create A Temporary One
  const context = request ?? (await playwrightRequest.newContext());

  try {
    const startTime = Date.now();
    const res = await context.fetch(url, { method, ...rest });

    logger.info(`API ${method} ${url} -> ${res.status()}`, {
      durationMs: Date.now() - startTime,
      body: rest.data,
    });

    if (!res.ok()) {
      const errorText = await res.text();
      logger.error(`API ${method} ${url} failed: ${res.status()}`, errorText);
      throw new Error(
        `Failed to ${method} ${url}: ${res.status()} ${res.statusText()}. Response: ${errorText}`,
      );
    }

    const text = await res.text();
    return (text ? JSON.parse(text) : undefined) as T;
  } finally {
    // Only Dispose The Context Created Inside This Function
    if (!request) {
      await context.dispose();
    }
  }
};

// ===== METHOD HELPERS =====
// GET
export const getApi = <T = unknown>(
  url: string,
  options: MethodOptions = {},
  request?: APIRequestContext,
): Promise<T> => fetchApi<T>(url, { ...options, method: "GET" }, request);

// POST
export const postApi = <T = unknown>(
  url: string,
  data?: unknown,
  options: MethodOptionsWithBody = {},
  request?: APIRequestContext,
): Promise<T> =>
  fetchApi<T>(url, { ...options, method: "POST", data }, request);

// PUT
export const putApi = <T = unknown>(
  url: string,
  data?: unknown,
  options: MethodOptionsWithBody = {},
  request?: APIRequestContext,
): Promise<T> => fetchApi<T>(url, { ...options, method: "PUT", data }, request);

// PATCH
export const patchApi = <T = unknown>(
  url: string,
  data?: unknown,
  options: MethodOptionsWithBody = {},
  request?: APIRequestContext,
): Promise<T> =>
  fetchApi<T>(url, { ...options, method: "PATCH", data }, request);

// DELETE
export const deleteApi = <T = unknown>(
  url: string,
  options: MethodOptionsWithBody = {},
  request?: APIRequestContext,
): Promise<T> => fetchApi<T>(url, { ...options, method: "DELETE" }, request);

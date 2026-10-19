import {
  APIRequestContext,
  request as playwrightRequest,
} from "@playwright/test";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchApiOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: unknown;
  timeout?: number;
}

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
    const res = await context.fetch(url, { method, ...rest });

    if (!res.ok()) {
      const errorText = await res.text();
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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions extends RequestInit {
  /** Jika true, throw UnauthorizedError saat 401 (biar caller bisa redirect) */
  throwOnUnauthorized?: boolean;
}

/**
 * Handle response dari fetch:
 * - 401 → throw UnauthorizedError (jika throwOnUnauthorized)
 * - !ok → parse body error & throw ApiError dengan pesan dari server
 * - 204 / empty body → return undefined
 * - selain itu → parse JSON
 */
async function parseResponse<T>(response: Response): Promise<T> {
  // 204 No Content atau body kosong
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const hasJsonBody = contentType.includes("application/json");

  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    if (hasJsonBody) {
      try {
        const data = await response.json();
        message = data?.message ?? message;
      } catch {}
    }

    throw new ApiError(response.status, message);
  }

  // Response OK tapi body kosong (rare, tapi bisa terjadi)
  if (!hasJsonBody) {
    const text = await response.text();
    if (!text) return undefined as T;

    try {
      return JSON.parse(text) as T;
    } catch {
      return text as unknown as T;
    }
  }

  return (await response.json()) as T;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { throwOnUnauthorized = true, ...fetchOptions } = options;

  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    ...fetchOptions,
  });

  if (response.status === 401 && throwOnUnauthorized) {
    throw new UnauthorizedError();
  }

  return parseResponse<T>(response);
}

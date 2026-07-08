// =============================================================================
// NEXUS — Production-Grade Axios API Client & Global Error Manager
// =============================================================================

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Cache structure to prevent redundant financial data fetches
const apiCache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache default

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// Global API Instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 30000, // 30 seconds timeout for high-stakes banking transactions
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Correlation IDs, JWT attachment
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Generate Correlation ID for audit logging and distributed tracing
    const correlationId = `corr_${Math.random().toString(36).substring(2, 15)}`;
    config.headers.set('X-Correlation-ID', correlationId);

    // Retrieve token from local storage or Zustand if running in browser
    if (typeof window !== 'undefined') {
      const authStateRaw = localStorage.getItem('nexus-auth-state');
      if (authStateRaw) {
        try {
          const authState = JSON.parse(authStateRaw);
          const token = authState?.state?.token;
          if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
          }
        } catch (e) {
          console.error('Failed to parse active authentication tokens:', e);
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Mapping & Retry logic
apiClient.interceptors.response.use(
  (response) => {
    // Optional: Write response to Cache if marked as cacheable
    const cacheKey = `${response.config.method}:${response.config.url}`;
    if (response.config.method?.toLowerCase() === 'get') {
      apiCache.set(cacheKey, {
        data: response.data,
        expiry: Date.now() + CACHE_TTL_MS,
      });
    }
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const config = error.config;
    if (!config) return Promise.reject(error);

    // Re-typing retry configurations safely
    const customConfig = config as any;
    customConfig._retryCount = customConfig._retryCount || 0;

    // Retry policy: Up to 3 times on connection issues or 502/503/504 errors
    const MAX_RETRIES = 3;
    const shouldRetry =
      error.code === 'ECONNABORTED' ||
      !error.response ||
      (error.response.status >= 502 && error.response.status <= 504);

    if (shouldRetry && customConfig._retryCount < MAX_RETRIES) {
      customConfig._retryCount += 1;
      const delay = Math.pow(2, customConfig._retryCount) * 1000; // Exponential backoff: 2s, 4s, 8s
      console.warn(`API call failed. Retrying instance in ${delay}ms (${customConfig._retryCount}/${MAX_RETRIES})...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return apiClient(config);
    }

    // Format & Map global business errors
    const friendlyError = formatApiError(error);
    return Promise.reject(friendlyError);
  }
);

// Formatter to map HTTP status codes to enterprise business messages
function formatApiError(error: AxiosError<ApiErrorResponse>): Error & { code?: string; details?: any } {
  const status = error.response?.status;
  const data = error.response?.data;

  let message = 'An unexpected connection issue occurred. Please check network settings.';
  let code = 'NETWORK_ERROR';
  const details = data?.details || null;

  if (status) {
    code = data?.code || `HTTP_${status}_ERROR`;
    switch (status) {
      case 400:
        message = data?.message || 'Invalid parameters supplied. Please check input formats.';
        break;
      case 401:
        message = 'Authentication required. Your session may have expired.';
        break;
      case 403:
        message = 'Access Denied. You do not possess the necessary access clearance.';
        break;
      case 404:
        message = 'Requested financial resource could not be found.';
        break;
      case 422:
        message = 'Unprocessable entity. Validation errors detected.';
        break;
      case 500:
      default:
        message = 'Internal ledger/database error occurred. Our engineering team has been notified.';
        break;
    }
  }

  const enhancedError = new Error(message) as any;
  enhancedError.code = code;
  enhancedError.details = details;
  enhancedError.originalError = error;
  return enhancedError;
}

// Fetch helper that checks local cache before firing request
export async function cachedGet<T>(url: string, bypassCache = false): Promise<T> {
  const cacheKey = `get:${url}`;
  if (!bypassCache) {
    const cached = apiCache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data as T;
    }
  }
  const response = await apiClient.get<T>(url);
  return response.data;
}

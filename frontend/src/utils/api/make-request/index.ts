import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshQueue: Array<(ok: boolean) => void> = [];
let onLogout: (() => void) | null = null;

export const setAuthHandlers = (handlers: { onLogout?: () => void }) => {
  onLogout = handlers.onLogout ?? null;
};

const enqueue = (cb: (ok: boolean) => void) => refreshQueue.push(cb);
const flush = (ok: boolean) => {
  const q = refreshQueue;
  refreshQueue = [];
  q.forEach((cb) => cb(ok));
};

const isRefreshRequest = (config?: AxiosRequestConfig) => !!config?.url && config.url.includes('/auth/refresh');
const isAuthRequest = (config?: AxiosRequestConfig) =>
  !!config?.url &&
  (config.url.includes('/auth/login') ||
    config.url.includes('/auth/sign-up') ||
    config.url.includes('/auth/verify-email') ||
    config.url.includes('/auth/request-new-otp') ||
    config.url.includes('/auth/forgot-password') ||
    config.url.includes('/auth/verify-forgot-password-otp') ||
    config.url.includes('/auth/reset-password') ||
    config.url.includes('/auth/change-password'));

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (!error.response || error.response.status !== 401 || !original) {
      return Promise.reject(error);
    }

    if (isAuthRequest(original)) {
      return Promise.reject(error);
    }

    if (original._retry || isRefreshRequest(original)) {
      if (onLogout) onLogout();

      return Promise.reject(error);
    }
    original._retry = true;

    if (isRefreshing) {
      const ok = await new Promise<boolean>((resolve) => enqueue(resolve));

      if (ok) return api(original);
      if (onLogout) onLogout();

      return Promise.reject(error);
    }

    isRefreshing = true;
    try {
      await api.post('/auth/refresh');

      flush(true);

      return api(original);
    } catch (e) {
      flush(false);

      if (onLogout) onLogout();

      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  },
);

export const makeRequest = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data?: unknown) => {
  return await api({ url, method, data });
};

export default api;

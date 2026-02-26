import axios, { type AxiosInstance } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://fincha.tewostechsolutions.com/api/v1";

const clients = new Map<string, AxiosInstance>();

export const createApiClient = (locale: string, token?: string): AxiosInstance => {
  const cacheKey = `${locale}:${token ?? ""}`;
  const cached = clients.get(cacheKey);
  if (cached) return cached;

  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": locale,
    },
    withCredentials: true,
  });

  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  clients.set(cacheKey, client);
  return client;
};

export const getApiClient = (locale: string, token?: string) => createApiClient(locale, token);

import useSWR, { type SWRConfiguration } from "swr";

import { getApiClient } from "@/lib/api-client";
import { useLocaleContext } from "@/providers/providers";

export const fetcher = async <T>(url: string, locale: string): Promise<T> => {
  const client = getApiClient(locale);
  const response = await client.get<T>(url);
  return response.data as T;
};

export const useApi = <T>(key: string | null, config?: SWRConfiguration<T>) => {
  const { locale } = useLocaleContext();

  return useSWR<T>(key, key ? (resource) => fetcher<T>(resource, locale) : null, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    ...config,
  });
};

import { useQuery } from "@tanstack/react-query";

import { useLocaleContext } from "@/providers/providers";
import { getApiClient } from "@/lib/api-client";
import type { CompanyInfo, NavigationLink } from "@/types/cms";

const createQueryKey = <T extends string[]>(...parts: T) => ["layout", ...parts];

export const layoutQueryKeys = {
  footer: () => createQueryKey("footer"),
  companyInfo: () => createQueryKey("company-info"),
};

type FooterResponse = { pages: NavigationLink[] };

export function useFooterLinks(initialData?: FooterResponse) {
  const { locale } = useLocaleContext();

  return useQuery({
    queryKey: layoutQueryKeys.footer(),
    queryFn: async () => {
      const client = getApiClient(locale);
      const response = await client.get<FooterResponse>("/footer");
      return response.data;
    },
    placeholderData: initialData,
    staleTime: 1000 * 60 * 5,
    initialData,
  });
}

export function usePublicCompanyInfo(initialData?: CompanyInfo | null) {
  const { locale } = useLocaleContext();

  return useQuery({
    queryKey: layoutQueryKeys.companyInfo(),
    queryFn: async () => {
      const client = getApiClient(locale);
      const response = await client.get<CompanyInfo>("/company-info");
      return response.data;
    },
    placeholderData: initialData ?? undefined,
    staleTime: 1000 * 60 * 10,
    initialData,
  });
}

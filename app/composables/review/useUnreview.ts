import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { UnreviewHistoryType } from "~/types/review";

export const useUnreview = () => {
  const { $api } = useNuxtApp();
  return useQuery<UnreviewHistoryType[], Error>({
    queryKey: ["unreview-history"],
    queryFn: async () => {
      try {
        const token = useCookie("token");
        const res = await $api.get("account/unreview/me", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as UnreviewHistoryType[];
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan products"
        );
      }
    },
  });
}
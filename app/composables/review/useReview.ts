import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { ReviewHistoryType } from "~/types/review";

export const useReview = () => {
  const { $api } = useNuxtApp();
  return useQuery<ReviewHistoryType[], Error>({
    queryKey: ["review-history"],
    queryFn: async () => {
      try {
        const token = useCookie("token");
        const res = await $api.get("account/review/me", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as ReviewHistoryType[];
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan review"
        );
      }
    },
  });
};

import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { CheckoutTableType } from "~/types/checkout";
import type { ErrorResponse } from "~/types/error";

export const useHistoryAdmin = () => {
  const { $api } = useNuxtApp();
  const token = useCookie("token");
  
  return useQuery<CheckoutTableType[], Error>({
    queryKey: ["checkout-history-admin"],
    queryFn: async () => {
      try {
        const res = await $api.get("checkout", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as CheckoutTableType[];
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan riwayat checkout admin"
        );
      }
    },
  });
};

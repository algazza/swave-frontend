import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { CheckoutHistoryType } from "~/types/checkout";
import type { ErrorResponse } from "~/types/error";

export const useHistory = () => {
  const { $api } = useNuxtApp();
  return useQuery<CheckoutHistoryType[], Error>({
    queryKey: ["checkout-history"],
    queryFn: async () => {
      try {
        const token = useCookie("token");
        const res = await $api.get("checkout/me", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as CheckoutHistoryType[];
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan user"
        );
      }
    },
  });
};

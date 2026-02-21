import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type {
  CheckoutDetailAdminType,
} from "~/types/checkout";
import type { ErrorResponse } from "~/types/error";

export const useDetailCheckoutAdmin = (orderId: Ref<string>) => {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  return useQuery<CheckoutDetailAdminType, Error>({
    queryKey: ["checkout-history", orderId],
    queryFn: async () => {
      try {
        const res = await $api.get(`checkout/${orderId.value}`, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as CheckoutDetailAdminType;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        const statusCode = error.response?.status;
        
        if (statusCode === 403 || statusCode === 404) {
          throw createError({
            statusCode,
            statusMessage: error.response?.data?.message || (statusCode === 403 ? "Forbidden" : "Not Found"),
            fatal: true,
          });
        }
        
        throw new Error(
          error.response?.data?.message ||
            "Gagal mendapatkan riwayat checkout admin",
        );
      }
    },
  });
};

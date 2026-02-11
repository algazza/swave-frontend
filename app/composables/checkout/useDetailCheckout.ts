import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { CheckoutHistoryDetailType } from "~/types/checkout";
import type { ErrorResponse } from "~/types/error";

export const useDetailCheckout = (orderId: Ref<string>) => {
  const { $api } = useNuxtApp();

  return useQuery<CheckoutHistoryDetailType, Error>({
    queryKey: ["checkout-detail", orderId],
    queryFn: async () => {
      try {
        const token = useCookie("token");
        const res = await $api.get(`checkout/me/${orderId.value}`, {
          headers: {
            Authorization: `${token.value}`,
          },
        });

        return res.data.data as CheckoutHistoryDetailType;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        if(error.response?.status === 401) {
          const router = useRouter();
          router.push('/login');
        }
        throw new Error(
          error.response?.data.message || "Gagal mendapatkan detail checkout",
        );
      }
    },
    throwOnError: true,
    enabled: computed(() => !!orderId.value)
  });
};

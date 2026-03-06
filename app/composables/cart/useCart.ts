import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { CheckoutProductType } from "~/types/checkout";
import type { ErrorResponse } from "~/types/error";

export const useCart = () => {
  const { $api } = useNuxtApp();
  return useQuery<CheckoutProductType[], Error>({
    queryKey: ["cart"],
    queryFn: async () => {
      try {
        const token = useCookie("token");
        const res = await $api.get("/cart", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as CheckoutProductType[];
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan cart",
        );
      }
    },
  });
};

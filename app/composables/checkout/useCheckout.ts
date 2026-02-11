import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { CheckoutType } from "~/types/checkout";
import type { ErrorResponse } from "~/types/error";

export const useCheckout = () => {
  const { $api } = useNuxtApp();

  return useMutation({
    mutationFn: async (payload: CheckoutType) => {
      try {
        const token = useCookie("token");
        const res = await $api.post("/checkout", payload, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(error.response?.data?.message || "Gagal Melakukan Checkout");
      }
    },
  });
}
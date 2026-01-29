import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { push } from "notivue";
import type { AxiosError } from "axios";
import type { AddCartRequestType } from "~/types/cart";
import type { ErrorResponse } from "~/types/error";

export const useAddCart = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddCartRequestType) => {
      try {
        const token = useCookie("token");
        const res = await $api.post("/cart", payload, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal menambahkan ke cart",
        );
      }
    },
    onSuccess() {
      push.success("Success Add to Cart");
      queryClient.invalidateQueries({
        queryKey: ["cart-count"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
        refetchType: "active",
      });
    },
  });
};

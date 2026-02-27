import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";

export const useDeleteProduct = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) => {
      try {
        const token = useCookie("token");
        const res = await $api.delete(`/product/${productId}`, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data;
      } catch (err) {   
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Delete product gagal",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        refetchType: "active",
      });
    },
  });
};

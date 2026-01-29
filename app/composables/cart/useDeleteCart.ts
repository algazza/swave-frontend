import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import { push } from "notivue";
import type { ErrorResponse } from "~/types/error";

export const useDeleteCart = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      try {
        const token = useCookie("token");
        const res = await $api.delete(`/cart/${id}`, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal menghapus cart",
        );
      }
    },
    onSuccess() {
      push.success("Success Delete from Cart");
      queryClient.invalidateQueries({
        queryKey: ["cart"],
        refetchType: "active",
      });
    },
  });
};

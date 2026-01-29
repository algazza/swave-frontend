import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useDebounceFn } from "@vueuse/core";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";

export const useEditCart = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: { id: number; quantity: number }) => {
      try {
        const token = useCookie("token");
        await $api.put(`/cart/${payload.id}`, payload, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(error.response?.data?.message || "Gagal mengedit cart");
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
        refetchType: "active",
      });
    },
  });

  const updateQuantity = useDebounceFn(
    (id: number, quantity: number) => {
      mutation.mutate({ id, quantity });
    },
    300,
    { maxWait: 1500 },
  );

  return {
    updateQuantity,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

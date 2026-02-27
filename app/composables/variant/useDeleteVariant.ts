import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";

export const useDeleteVariant = (slug: Ref<string>) => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, variant}: { productId: number, variant: string }) => {
      try {
        const token = useCookie("token");
        const res = await $api.delete(`/variant/${productId}/${variant}`, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data;
      } catch (err) {   
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Delete variant gagal",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products-detail", slug],
        refetchType: "active",
      });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { VariantsType } from "~/types/variant";

export const useUploadProductVariant = (slug?: Ref<string>) => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      payload,
    }: {
      productId: number;
      payload: VariantsType;
    }) => {
      try {
        const token = useCookie("token");
        const res = await $api.post(`/variant/${productId}`, payload, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal Menambah varian produk",
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
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { ProductEditReqType } from "~/types/product";

export const useEditVariant = (slug: Ref<string>) => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      variant,
      payload,
    }: {
      productId: number;
      variant: string;
      payload: ProductEditReqType;
    }) => {
      const token = useCookie("token");
      const res = await $api.put(`/variant/${productId}/${variant}`, payload, {
        headers: {
          Authorization: `${token.value}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products-detail", slug],
        refetchType: "active",
      });
    },
  });
};

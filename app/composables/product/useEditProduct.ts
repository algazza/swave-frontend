import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { ProductEditReqType } from "~/types/product";

export const useEditProduct = (slug: Ref<string>) => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      payload,
    }: {
      productId: number;
      payload: ProductEditReqType;
    }) => {
      const token = useCookie("token");
      const res = await $api.put(`/product/${productId}`, payload, {
        headers: {
          Authorization: `${token.value}`,
        },
      });
      console.log("Edit Product API Response:", res.data);
      return res.data.data;
    },
    onSuccess: (data) => {
      const newSlug = data?.data?.slug || data?.slug;
      console.log("onSuccess - New slug:", newSlug);

      queryClient.invalidateQueries({
        queryKey: ["products-detail", slug],
        refetchType: "active",
      });

      if (newSlug && newSlug !== slug.value) {
        queryClient.invalidateQueries({
          queryKey: ["products-detail", newSlug],
          refetchType: "active",
        });
      }
    },
  });
};

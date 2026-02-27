import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";

export const addProductImage = (slug: Ref<string>) => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      formData,
    }: {
      productId: number;
      formData: FormData;
    }) => {
      try {
        const token = useCookie("token");
        await $api.post(`/product/${productId}/image`, formData, {
          headers: {
            Authorization: `${token.value}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Failed to add product image",
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

export const updateProductImage = (slug: Ref<string>) => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      imageId,
      formData,
    }: {
      productId: number;
      imageId: number;
      formData: FormData;
    }) => {
      try {
        const token = useCookie("token");
        await $api.post(`/product/${productId}/image/${imageId}`, formData, {
          headers: {
            Authorization: `${token.value}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Failed to update product image",
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

export const deleteProductImage = (slug: Ref<string>) => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      imageId,
    }: {
      productId: number;
      imageId: number;
    }) => {
      try {
        const token = useCookie("token");
        await $api.delete(`/product/${productId}/image/${imageId}`, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Failed to delete product image",
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

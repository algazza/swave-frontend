import { useMutation } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { VariantsType } from "~/types/variant";

export const useUploadProduct = () => {
  const { $api } = useNuxtApp();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const token = useCookie("token");
        const res = await $api.post("/product", formData, {
          headers: {
            Authorization: `${token.value}`,
            "Content-Type": "multipart/form-data",
          },
        });
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal Menambah produk",
        );
      }
    },
  });
};

export const useUploadProductVariant = () => {
  const { $api } = useNuxtApp();

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
  });
};

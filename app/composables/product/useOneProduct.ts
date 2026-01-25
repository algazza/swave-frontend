import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { ProductDetailType } from "~/types/product";

export const useOneProducts = (id: string) => {
  const { $api } = useNuxtApp();
  return useQuery<ProductDetailType, Error>({
    queryKey: ["products-detail", id],
    queryFn: async () => {
      try {
        const res = await $api.get(`product/${id}`);
        return res.data.data as ProductDetailType;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data.message || "Gagal mendapatkan produk",
        );
      }
    },
  });
};

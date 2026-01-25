import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { ProductType } from "~/types/product";

export const useRecProduct = (id: string) => {
  const { $api } = useNuxtApp();
  return useQuery<ProductType[], Error>({
    queryKey: ["rec-products"],
    queryFn: async () => {
      try {
        const res = await $api.get(`product/recommended/${id}`);
        return res.data.data as ProductType[];
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data.message || "Gagal mendapatkan produk",
        );
      }
    },
  });
};

import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { ProductType } from "~/types/product";

export const useProducts = () => {
  const { $api } = useNuxtApp();
  return useQuery<ProductType[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await $api.get("product");
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
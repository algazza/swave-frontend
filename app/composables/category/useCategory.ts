import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { CategoryType } from "~/types/category";
import type { ErrorResponse } from "~/types/error";

export const useCategory = () => {
  const { $api } = useNuxtApp();
  return useQuery<CategoryType[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await $api.get("category");
        return res.data.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data.message || "Gagal mendapatkan kategori",
        );
      }
    },
  });
};

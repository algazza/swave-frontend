import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";

export const useUploadProduct = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        refetchType: "active",
      });
    }
  });
};

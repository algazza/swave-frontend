import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";

export const useCartCount = () => {
  const { $api } = useNuxtApp();

  return useQuery({
    queryKey: ["cart-count"],
    queryFn: async () => {
      try {
        const token = useCookie("token");
        const res = await $api.get("/cart/count", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as number;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal menambahkan ke cart",
        );
      }
    },
  });
};

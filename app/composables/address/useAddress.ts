import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { AddressType } from "~/types/address";
import type { ErrorResponse } from "~/types/error";

export const useAddress = () => {
  const { $api } = useNuxtApp();
  return useQuery<AddressType[], Error>({
    queryKey: ["address"],
    queryFn: async () => {
      try {
        const token = useCookie("token");
        const res = await $api.get("account/address", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as AddressType[];
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan user"
        );
      }
    },
  });
};

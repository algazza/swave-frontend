import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { CreateContactType } from "~/types/contact";
import type { ErrorResponse } from "~/types/error";

export const useDetailContact = (id: Ref<number>) => {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  return useQuery<CreateContactType, Error>({
    queryKey: ["contact", id],
    queryFn: async () => {
      try {
        const res = await $api.get(`/contact/${id.value}`, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as CreateContactType;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan kontak",
        );
      }
    },
  });
};

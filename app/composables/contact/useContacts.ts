import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ContactType } from "~/types/contact";
import type { ErrorResponse } from "~/types/error";

export const useContacts = () => {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  return useQuery<ContactType[], Error>({
    queryKey: ["contacts"],
    queryFn: async () => {
      try {
        const res = await $api.get("/contact", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as ContactType[];
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan kontak",
        );
      }
    },
  });
};

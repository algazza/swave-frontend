import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { AllUserAdminType } from "~/types/user";

export const useAllUsers = () => {
  const { $api } = useNuxtApp();
  return useQuery<AllUserAdminType[], Error>({
    queryKey: ["all-users"],
    queryFn: async () => {
      try {
        const token = useCookie("token");
        const res = await $api.get("account/profile", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as AllUserAdminType[];
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan user",
        );
      }
    },
  });
};

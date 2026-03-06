import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { UserType } from "~/types/user";

export const useUsers = () => {
  const { $api } = useNuxtApp();
  return useQuery<UserType, Error>({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const token = useCookie("token");
        const res = await $api.get("account/profile/me", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as UserType;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan user"
        );
      }
    },
  });
};

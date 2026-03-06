import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { UserDetailAdminType } from "~/types/user";

export const useDetailUser = (username: Ref<string>) => {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  return useQuery({
    queryKey: ["user-detail", username],

    queryFn: async () => {
      try {
        const res = await $api.get(`/account/profile/${username.value}`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        return res.data.data as UserDetailAdminType;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan detail user",
        );
      }
    },
  });
};

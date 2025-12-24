import { useMutation } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { EditUserType } from "~/types/user";

export const useEditUser = () => {
  const { $api } = useNuxtApp();
  return useMutation({
    mutationFn: async (payload: EditUserType) => {
      try {
        const token = useCookie('token')
        const res = await $api.put("/account/profile", payload, {
          headers: {
          Authorization: token.value
          }
        });
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(error.response?.data?.message || "Edit User gagal");
      }
    },
  });
};

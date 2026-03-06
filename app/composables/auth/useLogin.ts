import { useMutation } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { LoginType } from "~/types/user";

export const useLogin = () => {
  const { $api } = useNuxtApp();
  return useMutation({
    mutationFn: async (payload: LoginType) => {
      try {
        const res = await $api.post("/auth/signin", payload);
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(error.response?.data?.message || "Login gagal");
      }
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { push } from "notivue";
import type { AxiosError } from "axios";
import type { CreateContactType } from "~/types/contact";
import type { ErrorResponse } from "~/types/error";

export const useCreateContact = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateContactType) => {
      try {
        const res = await $api.post("/contact", data);
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal membuat kontak",
        );
      }
    },
    onSuccess() {
      push.success("Success Add Contact");
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
        refetchType: "active",
      });
    },
  });
};

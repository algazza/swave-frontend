import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import { push } from "notivue";

export const useAddCategory = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { name: string }) => {
      try {
        const token = useCookie("token");
        const res = await $api.post("/category", payload, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(error.response?.data?.message || "Add category gagal");
      }
    },
    onSuccess(){
        push.success("Success Add Category");
        queryClient.invalidateQueries({
          queryKey: ["categories"],
          refetchType: "active",
        });
    }
  });
};

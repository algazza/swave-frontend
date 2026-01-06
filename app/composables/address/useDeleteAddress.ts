import { push } from "notivue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";

export const useDeleteAddress = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      try {
        const token = useCookie("token");
        const res = await $api.delete(`/account/address/${id}`, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Delete address gagal"
        );
      }
    },
    onSuccess: () => {
      push.success("Success Delete Address");
      queryClient.invalidateQueries({
        queryKey: ["address"],
        refetchType: "active",
      });
    },
  });
};

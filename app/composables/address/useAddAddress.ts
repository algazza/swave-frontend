import { push } from "notivue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { AddAddressType } from "~/types/address";
import type { ErrorResponse } from "~/types/error";

export const useAddAddress = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddAddressType) => {
      try {
        const token = useCookie("token");
        const res = await $api.post("/account/address", payload, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(error.response?.data?.message || "Add address gagal");
      }
    },
    onSuccess() {
      push.success("Success Add Address");
      queryClient.invalidateQueries({
        queryKey: ["address"],
        refetchType: "active",
      });
    },
  });
};

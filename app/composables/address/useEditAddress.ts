import { push } from "notivue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { EditAddressType } from "~/types/address";
import type { ErrorResponse } from "~/types/error";

export const useEditAddress = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: EditAddressType & { id: number }) => {
      try {
        const token = useCookie("token");
        const { id, ...addressData } = payload;
        const res = await $api.put(`/account/address/${id}`, addressData, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(error.response?.data?.message || "Edit address gagal");
      }
    },
    onSuccess: () => {
      push.success("Success Edit Address");
      queryClient.invalidateQueries({
        queryKey: ["address"],
        refetchType: "active",
      });
    },
  });
};

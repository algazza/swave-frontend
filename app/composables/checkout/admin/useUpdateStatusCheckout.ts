import { push } from "notivue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { EditAddressType } from "~/types/address";
import type { ErrorResponse } from "~/types/error";
import type { UpdateStatusCheckoutType } from "~/types/checkout";

export const useUpdateStatusCheckout = (orderId: Ref<string>) => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateStatusCheckoutType) => {
      try {
        const token = useCookie("token");
        const res = await $api.post(`checkout/${orderId.value}`, payload, {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(error.response?.data?.message || "Edit checkout status gagal");
      }
    },
    onSuccess: () => {
      push.success("Success Update Checkout Status");
      queryClient.invalidateQueries({
        queryKey: ["checkout-history", orderId],
        refetchType: "active",
      });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/error";
import type { AddReviewType } from "~/types/review";
import { push } from "notivue";

export const useAddReview = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddReviewType) => {
      try {
        const token = useCookie("token");
        const res = await $api.post("/account/review", payload, {
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
      push.success("Success Add Review");
      queryClient.invalidateQueries({
        queryKey: ["review-history", "unreview-history"],
        refetchType: "active",
      });
    },
  });
};

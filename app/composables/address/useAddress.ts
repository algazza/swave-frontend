import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import type { Ref, ComputedRef } from "vue";
import type { AddressType } from "~/types/address";
import type { ErrorResponse } from "~/types/error";

export const useAddress = () => {
  const { $api } = useNuxtApp();
  return useQuery<AddressType[], Error>({
    queryKey: ["address"],
    queryFn: async () => {
      try {
        const token = useCookie("token");
        const res = await $api.get("account/address", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data as AddressType[];
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan address",
        );
      }
    },
  });
};

export const useAddressDistance = (
  addressId: Ref<number> | ComputedRef<number>,
) => {
  const { $api } = useNuxtApp();
  return useQuery<number, Error>({
    queryKey: ["address-distance", addressId],
    queryFn: async () => {
      try {
        const token = useCookie("token");
        const res = await $api.get(
          `account/address/distance/${unref(addressId)}`,
          {
            headers: {
              Authorization: `${token.value}`,
            },
          },
        );
        return res.data.data.distance as number;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        throw new Error(
          error.response?.data?.message || "Gagal mendapatkan jarak address",
        );
      }
    },
    enabled: computed(() => !!unref(addressId)),
  });
};

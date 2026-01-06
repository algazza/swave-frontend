<script setup lang="ts">
import {
  Building2,
  Home,
  Hotel,
  MapPin,
  Pen,
  School,
  Trash2,
} from "lucide-vue-next";
import type { AddressType } from "~/types/address";
import DialogEditAddress from "./DialogEditAddress.vue";
import { useDeleteAddress } from "~/composables/address/useDeleteAddress";
import Dialogtes from "./Dialogtes.vue";

const props = defineProps<{
  address: AddressType | undefined;
}>();
const { mutate, isPending, error } = useDeleteAddress();

const icon =
  props.address?.label === "Home"
    ? Home
    : props.address?.label === "Office"
    ? Building2
    : props.address?.label === "Apartment"
    ? Hotel
    : School;

const onDelete = () => {
  if (!props.address) return;
  mutate(props.address.id);
};
</script>

<template>
  <div class="border-2 rounded-xl p-5 w-full flex justify-between items-center">
    <div class="space-y-1">
      <div class="flex gap-2">
        <div
          class="bg-secondary flex gap-2 justify-center items-center p-1 rounded-lg font-semibold"
        >
          <component :is="icon" />
          <span class="text-sm">{{ address?.label }}</span>
        </div>
        <div
          class="flex gap-2 justify-center items-center p-1 rounded-lg font-semibold border border-foreground"
          v-if="address?.main_address === true"
        >
          <MapPin />
          <span class="text-sm">Main Address</span>
        </div>
      </div>
      <span class="text-lg font-semibold">{{ address?.recipient }}</span>
      <p class="text-sm font-medium">{{ address?.address }}</p>
    </div>
    <div class="flex gap-4">
      <DialogEditAddress :address="address">
        <Pen />
      </DialogEditAddress>
      <Trash2 @click="onDelete" class="text-destructive cursor-pointer" />
    </div>
  </div>
</template>

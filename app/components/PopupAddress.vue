<script setup lang="ts">
import { MapPin, Plus } from "lucide-vue-next";
import type { AddressType } from "~/types/user";

const emit = defineEmits<{
  (e: "change", value: AddressType): void;
}>();

const open = ref(false)
const props = defineProps<{
  mainAddress: AddressType | undefined
  addressArray: AddressType[]
}>()

const address = ref<AddressType | undefined>(props.mainAddress);
const selectAddress = (item: AddressType) => {
  address.value = item;
};

const saveAddress = () => {
  if (!address.value) return;
  emit("change", address.value);
  open.value = false
};
</script>

<template>
  <UiDialog v-model:open="open">
    <UiDialogTrigger as-child>
      <slot />
    </UiDialogTrigger>
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Change Address</UiDialogTitle>
      </UiDialogHeader>
      <div class="grid gap-2">
        <div
          v-for="addr in addressArray"
          class="flex gap-4 border-2 border-secondary rounded-md p-3 items-center duration-300"
          :class="addr.id === address?.id ? 'bg-secondary' : ''"
          @click="selectAddress(addr)"
        >
          <div>
            <UiCheckbox
              class="border-2 border-foreground"
              :model-value="addr.id === address?.id"
            />
          </div>
          <div class="grid gap-1">
            <div class="flex justify-start items-center gap-2">
              <div
                v-if="addr.main_address === true"
                class="p-1 border border-foreground rounded-md flex items-center justify-center gap-1"
              >
                <MapPin />
                <span class="font-semibold">Main Address</span>
              </div>
            </div>
            <p class="md:text-lg font-semibold">{{ addr.recipient }}</p>
            <p>
              {{ addr.address }}, {{ addr.subdistrict }}, {{ addr.city }},
              {{ addr.zip_code }}
            </p>
          </div>
        </div>
        <div
          class="border-2 border-secondary rounded-md p-2 items-center font-bold flex gap-2 justify-center text-muted-foreground hover:bg-secondary duration-300 cursor-pointer"
        >
          <Plus />
          <span>Add Address</span>
        </div>
      </div>
      <UiDialogFooter>
        <UiDialogClose as-child>
          <UiButton variant="outline"> Cancel </UiButton>
        </UiDialogClose>
        <UiButton type="submit" @click="saveAddress"> Save changes </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>

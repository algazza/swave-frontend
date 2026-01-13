<script setup lang="ts">
import {
  ChevronLeft,
} from "lucide-vue-next";
import { useAddress } from "~/composables/address/useAddress";

definePageMeta({
  layout: "account",
  middleware: "auth",
});

const { data: address, isLoading, isError, error } = useAddress();
if (isError.value) {
  throw error;
}
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col w-full">
      <div class="flex justify-between items-center mb-5 w-full">
        <div class="flex gap-3 items-center justify-center">
          <NuxtLink to="/account" class="lg:hidden">
            <ChevronLeft />
          </NuxtLink>
          <h2 class="text-3xl">Address</h2>
        </div>
        <AccountDialogAddress>
          <div
            class="text-background bg-foreground py-2 px-5 flex items-center justify-center rounded-xl font-semibold"
          >
            + Add New Address
          </div>
        </AccountDialogAddress>
      </div>

      <div class="flex gap-2 flex-col" v-if="isLoading">
        <UiSkeleton class="w-full h-32" />
        <UiSkeleton class="w-full h-32" />
        <UiSkeleton class="w-full h-32" />
      </div>
      <div class="flex gap-2 flex-col" v-if="address && address.length > 0">
        <AccountCardAddress
          v-for="addr in address"
          :address="addr"
          :key="addr.id"
        />
      </div>
      <p
        class="text-center text-muted-foreground"
        v-if="address && address.length === 0"
      >
        No addresses found.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { copyOrderID } from "~/lib/utils";

defineProps<{
  checkout: {
    username: string;
    order_id: string;
  };
}>();
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem @click="copyOrderID(checkout.order_id)">
        Copy order ID
      </UiDropdownMenuItem>
      <UiDropdownMenuSeparator />
      <NuxtLink
        :to="`/admin/checkout/${checkout.order_id}`"
        class="w-full h-full"
      >
        <UiDropdownMenuItem> View payment details </UiDropdownMenuItem>
      </NuxtLink>
      <NuxtLink :to="`/admin/user/${checkout.username}`" class="w-full h-full">
        <UiDropdownMenuItem> View customer </UiDropdownMenuItem>
      </NuxtLink>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

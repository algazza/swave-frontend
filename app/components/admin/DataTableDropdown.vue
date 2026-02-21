<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { copyOrderID } from "~/lib/utils";

defineProps<{
  checkout: {
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
        Copy payment ID
      </UiDropdownMenuItem>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem>View customer</UiDropdownMenuItem>
      <UiDropdownMenuItem
        ><NuxtLink :to="`/admin/checkout/${checkout.order_id}`"
          >View payment details</NuxtLink
        ></UiDropdownMenuItem
      >
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

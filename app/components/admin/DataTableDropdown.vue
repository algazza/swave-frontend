<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";

defineProps<{
  checkout: {
    order_id: number;
  };
}>();

function copy(id: number) {
  navigator.clipboard.writeText(String(id));
}
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
      <UiDropdownMenuItem @click="copy(checkout.order_id)">
        Copy payment ID
      </UiDropdownMenuItem>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem>View customer</UiDropdownMenuItem>
      <UiDropdownMenuItem>View payment details</UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

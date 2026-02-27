<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";

defineProps<{
  user: {
    username: string;
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
      <NuxtLink :to="`/admin/user/${user.username}`" class="w-full h-full">
        <UiDropdownMenuItem> View customer </UiDropdownMenuItem>
      </NuxtLink>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

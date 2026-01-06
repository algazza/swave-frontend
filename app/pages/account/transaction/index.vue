<script setup lang="ts">
import { ChevronLeft, CircleUserRound, Pen } from "lucide-vue-next";
import { useUsers } from "~/composables/user/useUsers";

definePageMeta({
  layout: "account",
  middleware: "auth",
});

const { data: user, isLoading, isError, error } = useUsers();
if (!isError) {
  throw error;
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex gap-3 items-center mb-5">
      <NuxtLink to="/account" class="lg:hidden">
        <ChevronLeft />
      </NuxtLink>
      <h2 class="text-3xl">Transaction</h2>
    </div>

    <div class="flex gap-2">
      
    </div>
  </div>
</template>

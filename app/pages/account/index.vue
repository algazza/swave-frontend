<script setup lang="ts">
import { CircleUserRound } from "lucide-vue-next";
import { useUsers } from "~/composables/user/useUsers";
import { accountLink } from "~/lib/constanta";

definePageMeta({
  middleware: ["mobile-only", "auth"],
});

const { data: user, isLoading, isError, error } = useUsers();
if (isError) {
  throw error;
}
</script>
<template>
  <section class="mt-6 mb-20 mx-6 flex flex-col gap-6 min-h-screen">
    <div class="flex items-center gap-2">
      <CircleUserRound class="size-20" />
      <div class="">
        <h2 class="text-3xl">{{ user?.name }}</h2>
        <UiSkeleton v-if="isLoading" class="w-40 h-9 mb-1" />
        <p class="">{{ user?.phone }}</p>
        <UiSkeleton v-if="isLoading" class="w-28 h-5" />
      </div>
    </div>

    <UiSeparator />

    <ul class="grid gap-5">
      <li v-for="link in accountLink" :key="link.name" class="">
        <NuxtLink :to="link.url">
          {{ link.name }}
        </NuxtLink>
      </li>
    </ul>

    <UiSeparator />

    <div class="grid justify-start">
      <button class="text-destructive font-semibold cursor-pointer">
        Logout
      </button>
    </div>
  </section>
</template>

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
      <h2 class="text-3xl">Account Setting</h2>
    </div>

    <div class="flex flex-col lg:flex-row gap-5">
      <div class="flex flex-col items-center lg:min-w-60 lg:max-w-60">
        <CircleUserRound class="size-32 mb-2" />
        <div v-if="!isLoading" class="flex flex-col justify-center items-center">
          <h3 class="text-2xl">
            {{ user?.name }}
          </h3>
          <p>@{{ user?.username }}</p>
          <p>{{ user?.phone }}</p>
        </div>
        <div v-if="isLoading" class="flex flex-col gap-1">
          <UiSkeleton class="w-40 h-6" />
          <UiSkeleton class="w-40 h-6" />
          <UiSkeleton class="w-40 h-6" />
        </div>
      </div>

      <UiSeparator orientation="vertical" class="h-full w-1 max-lg:hidden" />

      <div v-if="isLoading" class="flex flex-col gap-6 w-full">
        <UiSkeleton class="h-9 w-full" />
        <UiSkeleton class="h-9 w-full" />
        <UiSkeleton class="h-9 w-full" />
        <UiSkeleton class="h-9 w-full" />
      </div>

      <div
        v-if="!isLoading"
        class="grid grid-cols-[120px_minmax(380px,1fr)_1fr_20px] gap-8 w-full"
      >
        <div class="grid gap-6">
          <p class="py-2">Name</p>
          <p class="py-2">Username</p>
          <p class="py-2">Phone</p>
          <p class="py-2">Password</p>
        </div>

        <div class="grid gap-6 font-bold">
          <div class="py-2">
            {{ user?.name }}
          </div>
          <div class="py-2">
            {{ user?.username }}
          </div>
          <div class="py-2">
            {{ user?.phone }}
          </div>
          <div class="py-2">******</div>
        </div>

        <div class="grid gap-6">
          <div class="py-1.5 text-success-blue">
            <Pen />
          </div>
          <div class="py-1.5 text-success-blue">
            <Pen />
          </div>
          <div class="py-1.5 text-success-blue">
            <Pen />
          </div>
          <div class="py-1.5 text-success-blue">
            <Pen />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircleUserRound } from "lucide-vue-next";
import { useLogout } from "~/composables/auth/useLogout";
import { useUsers } from "~/composables/user/useUsers";
import { accountLink } from "~/lib/constanta";

const { data: user, isLoading, isError, error } = useUsers();
const logout = useLogout()
if (!isError) {
  throw error;
}
</script>

<template>
  <div class="">
    <AppHeader />

    <main
      class="overflow-hidden mt-20 relative px-4 md:px-10 lg:px-20 flex justify-center"
    >
      <div class="max-w-300 w-full">
        <section class="my-10 lg:my-20 flex gap-20">
          <div class="max-lg:hidden flex flex-col gap-6 min-w-60 max-w-60">
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
              <button class="text-destructive font-semibold cursor-pointer" @click="logout()">
                Logout
              </button>
            </div>
          </div>

          <slot />
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

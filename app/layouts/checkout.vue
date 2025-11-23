<script setup lang="ts">
import { Moon, User } from "lucide-vue-next";
import { logoBlack } from "~/lib/image";
</script>

<template>
  <div>
    <header
      class="fixed w-full p-5 top-0 left-0 bg-background z-100 md:px-10 lg:px-20 flex justify-center"
    >
      <div class="w-full max-w-[1200px]">
        <div class="flex justify-between">
          <NuxtLink href="/">
            <NuxtImg :src="logoBlack" alt="Swave" class="w-[131px]" />
          </NuxtLink>
          <div class="flex gap-4 items-center justify-end">
            <Moon />
            <User />
          </div>
        </div>
      </div>
    </header>
    <main
      class="overflow-hidden mt-20 relative px-4 md:px-10 lg:px-20 flex justify-center"
    >
      <div class="max-w-[1200px] w-full">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { BlackPick } from "./lib/image";
</script>
<template>
  <section class="w-full h-dvh flex justify-center items-center">
    <div class="flex flex-col md:flex-row gap-6 justify-center items-center">
      <NuxtImg alt="pick" :src="BlackPick" class="size-40" />
      <div class="space-y-6">
        <div class="font-bold text-center md:text-start">
          <h1 class="text-5xl">Oh no!</h1>
          <p>Something went wrong. Please try again</p>
        </div>
        <div class="text-center md:text-start">
          <NuxtLink to="/" class="underline">Go back home</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

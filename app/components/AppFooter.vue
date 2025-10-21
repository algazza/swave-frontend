<script setup lang="ts">
import { Dana, Gopay, logoWhite, QRIS, Spay } from "~/lib/image";

const brandImg = [QRIS, Gopay, Dana, Spay];
</script>

<template>
  <footer
    class="bg-foreground  px-4 pt-10 text-background md:px-10 lg:px-20 flex justify-center items-center"
  >
    <div class="w-full max-w-[1200px] flex flex-col">
      <div class="flex flex-col gap-2 md:flex-row md:gap-6 lg:justify-between">
        <div class="grid gap-4">
          <img :src="logoWhite" alt="logo" class="w-[145px]" />
          <p class="md:w-[300px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            vel ipsum et arcu egestas pretium non nec eros. Class aptent taciti
            sociosqu
          </p>
        </div>

        <div class="flex justify-between items-start md:gap-6 lg:gap-12">
          <ul class="grid gap-2">
            <span class="text-base font-semibold">Menu</span>
            <li>Home</li>
            <li>About</li>
            <li>Shop</li>
            <li>Account</li>
          </ul>
          <ul class="grid gap-2">
            <span class="text-base font-semibold">Social</span>
            <li>Instagram</li>
            <li>Tiktok</li>
            <li>Call Center</li>
          </ul>
          <ul class="grid gap-2">
            <span class="text-base font-semibold">Payment</span>
            <div
              class="bg-background px-3 py-2 w-fit rounded-lg"
              v-for="brand in brandImg"
            >
              <img :src="brand" :alt="brand" />
            </div>
          </ul>
        </div>
      </div>

      <div class="border-t-[1px] border-backgound py-5 text-center mt-5">
        &copy; All Right Reserved By
        <NuxtLink href="/" class="underline text-white">Swave</NuxtLink>
      </div>
    </div>
  </footer>
</template>

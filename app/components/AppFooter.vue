<script setup lang="ts">
import { Dana, Gopay, logoWhite, QRIS, Spay } from "~/lib/image";

const brandImg = [QRIS, Gopay, Dana, Spay];
</script>

<template>
  <footer class="bg-foreground px-4 pt-10 text-background grid gap-5">
    <div class="grid gap-2">
      <div class="grid gap-4">
        <img :src="logoWhite" alt="logo" class="w-[145px]" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vel ipsum et arcu egestas pretium non nec eros. Class aptent taciti
          sociosqu
        </p>
      </div>

      <div class="flex justify-between">
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

    <div class="border-t-[1px] border-background py-5 text-center">
        &copy; All Right Reserved By <Link href="/" class="underline">Swave</Link> 
    </div>
  </footer>
</template>

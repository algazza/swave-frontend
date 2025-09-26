<script setup lang="ts">
import { Menu, Moon, ShoppingCart, User } from "lucide-vue-next";
import { logoBlack } from "~/lib/image";
</script>

<template>
  <header class="fixed w-full p-5 top-0 left-0 bg-background z-[100]">
    <nav class="flex justify-between items-center">
      <div class="flex  items-center">
        <Menu />
        <img :src="logoBlack" alt="Swave" class="w-[131px]" />
      </div>

      <div class="flex gap-4 items-center">
        <Moon />
        <User />
        <ShoppingCart />
      </div>
    </nav>
  </header>
</template>

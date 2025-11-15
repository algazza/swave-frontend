<script setup lang="ts">
import { Menu, Moon, ShoppingCart, User } from "lucide-vue-next";
import { navLink } from "~/lib/constanta";
import { logoBlack } from "~/lib/image";
import { useUiStore } from "~/store/UiStore";

const ui = useUiStore()
</script>

<template>
  <header
    class="fixed w-full p-5 top-0 left-0 bg-background z-[100] md:px-10 lg:px-20 flex justify-center"
  >
  <CartHeader/>
    <div class="w-full max-w-[1200px]">
      <nav class="flex justify-between items-center">
        <div class="flex items-center lg:hidden">
          <div class="md:w-[104px] md:text-left cursor-pointer">
            <Menu />
          </div>

          <NuxtLink href="/">
            <img :src="logoBlack" alt="Swave" class="w-[131px] md:hidden" />
          </NuxtLink>
        </div>

        <ul class="flex gap-6 items-center max-lg:hidden">
          <li v-for="nav in navLink">
            <NuxtLink :to="nav.url">
              {{ nav.name }}
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink href="/">
          <img :src="logoBlack" alt="Swave" class="w-[131px] max-md:hidden" />
        </NuxtLink>

        <div class="flex gap-4 items-center lg:w-[255px] justify-end">
          <Moon />
          <User />
          <button @click="ui.toggleCart" class="cursor-pointer">
            <ShoppingCart />
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

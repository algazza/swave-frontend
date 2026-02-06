<script setup lang="ts">
import { Menu, Moon, ShoppingCart, User } from "lucide-vue-next";
import { useCartCount } from "~/composables/cart/useCartCount";
import { navLink } from "~/lib/constanta";
import { logoBlack } from "~/lib/image";

const { data, isLoading } = useCartCount();
const token = useCookie("token");
</script>

<template>
  <header
    class="fixed w-full p-5 top-0 left-0 bg-background z-2 md:px-10 lg:px-20 flex justify-center"
  >
    <CartHeader />
    <div class="w-full max-w-300">
      <nav class="flex justify-between items-center">
        <div class="flex items-center lg:hidden">
          <div class="md:w-26 md:text-left cursor-pointer">
            <Menu />
          </div>

          <NuxtLink to="/">
            <NuxtImg :src="logoBlack" alt="Swave" class="w-32.75 md:hidden" />
          </NuxtLink>
        </div>

        <ul class="flex gap-6 items-center max-lg:hidden">
          <li v-for="nav in navLink">
            <NuxtLink :to="nav.url">
              {{ nav.name }}
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink to="/">
          <NuxtImg :src="logoBlack" alt="Swave" class="w-32.75 max-md:hidden" />
        </NuxtLink>

        <div
          v-if="!token"
          class="flex gap-4 items-center lg:w-63.75 justify-end"
        >
          <Moon />
          <NuxtLink to="/login">
            <UiButton>Login</UiButton>
          </NuxtLink>
        </div>

        <div v-else class="flex gap-4 items-center lg:w-63.75 justify-end">
          <Moon />
          <NuxtLink class="cursor-pointer" to="/account">
            <User />
          </NuxtLink>
          <CartHeader>
            <div
              v-if="!isLoading && (data || 0) > 0"
              class="size-5.5 absolute -top-3 -right-3 bg-destructive text-background rounded-full text-xs flex justify-center items-center text-center font-bold"
            >
              {{ (data || 0) > 99 ? "99+" : data }}
            </div>
            <ShoppingCart />
          </CartHeader>
        </div>
      </nav>
    </div>
  </header>
</template>

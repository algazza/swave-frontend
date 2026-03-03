<script setup lang="ts">
import { Menu, Moon, ShoppingCart, User } from "lucide-vue-next";
import { useCartCount } from "~/composables/cart/useCartCount";
import { isAdmin } from "~/lib/admin";
import { navLink } from "~/lib/constanta";
import { logoBlack } from "~/lib/image";

const { data, isLoading } = useCartCount();
const token = useCookie("token");
const isMobileMenuOpen = ref(false);
</script>

<template>
  <header
    class="fixed w-full p-5 top-0 left-0 bg-background z-2 md:px-10 lg:px-20 flex justify-center"
  >
    <CartHeader />
    <div class="w-full max-w-300">
      <nav class="flex justify-between items-center">
        <div class="flex items-center gap-3 lg:hidden">
          <UiSheet v-model:open="isMobileMenuOpen">
            <UiSheetTrigger as-child>
              <button class="cursor-pointer" aria-label="Open navigation menu">
                <Menu />
              </button>
            </UiSheetTrigger>
            <UiSheetContent side="left" class="w-[80vw] max-w-80">
              <UiSheetHeader>
                <UiSheetTitle class="text-2xl">Menu</UiSheetTitle>
              </UiSheetHeader>

              <div class=" grid gap-6 px-4">
                <ul class="grid gap-3">
                  <li v-for="nav in navLink" :key="nav.name">
                    <NuxtLink
                      :to="nav.url"
                      class="text-base font-medium"
                      @click="isMobileMenuOpen = false"
                    >
                      {{ nav.name }}
                    </NuxtLink>
                  </li>
                </ul>

                <div class="grid gap-3 border-t pt-4">
                  <NuxtLink
                    v-if="token"
                    to="/account"
                    class="flex items-center gap-2"
                    @click="isMobileMenuOpen = false"
                  >
                    <User class="size-4" />
                    Account
                  </NuxtLink>

                  <NuxtLink
                    v-if="token && isAdmin(token)"
                    to="/admin"
                    @click="isMobileMenuOpen = false"
                  >
                    <UiButton class="w-full bg-accent hover:bg-accent/90"
                      >Admin</UiButton
                    >
                  </NuxtLink>

                  <NuxtLink
                    v-if="!token"
                    to="/login"
                    @click="isMobileMenuOpen = false"
                  >
                    <UiButton class="w-full">Login</UiButton>
                  </NuxtLink>
                </div>
              </div>
            </UiSheetContent>
          </UiSheet>

          <NuxtLink to="/">
            <NuxtImg :src="logoBlack" alt="Swave" class="w-32.75 md:hidden" />
          </NuxtLink>
        </div>

        <ul class="flex gap-6 items-center max-lg:hidden">
          <li v-for="nav in navLink" :key="nav.name">
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
          class="flex gap-3 items-center lg:w-63.75 justify-end"
        >
          <Moon />
          <NuxtLink to="/login" class="max-md:hidden">
            <UiButton>Login</UiButton>
          </NuxtLink>
        </div>

        <div v-else class="flex gap-3 items-center lg:w-63.75 justify-end">
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
          <NuxtLink to="/admin"
            ><UiButton
              v-if="isAdmin(token)"
              class="bg-accent hover:bg-accent/90"
              >Admin</UiButton
            ></NuxtLink
          >
        </div>
      </nav>
    </div>
  </header>
</template>

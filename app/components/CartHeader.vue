<script setup lang="ts">
import { Trash2, X } from "lucide-vue-next";
import { checkoutArray } from "~/lib/data";
import { formatRupiah } from "~/lib/utils";
import { useUiStore } from "~/store/UiStore";

const ui = useUiStore()
const checkbox = ref(false);

</script>

<template>
  <section v-if="ui.isCartOpen" class="z-[101] bg-foreground/20 w-full h-dvh fixed top-0 right-0" @click.self="ui.toggleCart">
    <div
      class="flex flex-col justify-between bg-background px-5 py-6 max-w-[420px] h-dvh"
    >
      <div class="grid gap-8">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl">Shopping Cart</h1>
          <button @click="ui.toggleCart" class="cursor-pointer">
              <X />
          </button>
        </div>

        <div class="grid gap-6 overflow-y-auto h-[calc(100dvh-260px)] px-2">
          <div v-for="check in checkoutArray" class="flex justify-between gap-2">
            <div class="flex gap-2 md:gap-6 justify-center items-center">
              <UiCheckbox
                class="border-2 border-foreground"
                v-model="checkbox"
              />
              <div class="size-20 aspect-square">
                <NuxtImg
                  :src="check.product.image"
                  :alt="check.product.name"
                  class="w-full h-full object-cover object-center outline-hidden"
                />
              </div>

              <div class="grid gap-2">
                <div class="p-1 bg-secondary w-fit">
                  {{ check.product.categories
                  }}{{
                    check.variant !== check.product.categories
                      ? `, ${check.variant}`
                      : ""
                  }}
                </div>
  
                <div class="grid">
                  <h3 class="text-lg truncate">{{ check.product.name }}</h3>
                  <p>Rp{{ formatRupiah(check.product.price) }}</p>
                </div>
                
                <UiNumberField
                  class="border border-foreground max-w-28"
                  :default-value="1"
                  :min="0"
                >
                  <UiNumberFieldContent>
                    <UiNumberFieldDecrement />
                    <UiNumberFieldInput class="text-sm rounded-none"/>
                    <UiNumberFieldIncrement />
                  </UiNumberFieldContent>
                </UiNumberField>

              </div>
            </div>

            <div class="flex justify-center">
              <button>
                <Trash2 class="text-destructive" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-secondary grid gap-2 p-2 rounded-xl">
        <div class="flex justify-between items-center">
          <h2 class="text-xl">Subtotal</h2>
          <p class="text-sm font-bold">Rp{{ formatRupiah(20000) }}</p>
        </div>
        <UiButton> Checkout </UiButton>
      </div>
    </div>
  </section>
</template>

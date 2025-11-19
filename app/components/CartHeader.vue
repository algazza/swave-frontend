<script setup lang="ts">
import { Trash2, X } from "lucide-vue-next";
import { formatRupiah } from "~/lib/utils";
import { useCartStore } from "~/store/CartStore";
import { useUiStore } from "~/store/UiStore";

const ui = useUiStore();
const cartStore = useCartStore();

const totalPrice = computed(() => {
  return cartStore.selectedCart.reduce(
    (total, item) => total + item.price * (item.quantity || 0),
    0
  );
});


</script>

<template>
  <section
    v-if="ui.isCartOpen"
    class="z-[101] bg-foreground/20 w-full h-dvh fixed top-0 right-0"
    @click.self="ui.toggleCart"
  >
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

        <div
          class="flex flex-col gap-6 overflow-y-auto h-[calc(100dvh-260px)] px-2"
        >
          <template v-if="cartStore.cart.length > 0">
            <div
              v-for="check in cartStore.cart"
              class="flex justify-between gap-2"
            >
              <div class="flex gap-2 md:gap-6 justify-center items-center">
                <UiCheckbox
                  class="border-2 border-foreground"
                  :model-value="cartStore.selectedCart.some(item => item.id === check.id)"
                  @update:model-value="cartStore.orderCart(check)"
                />
                <div class="size-20 aspect-square">
                  <NuxtImg
                    :src="check.product.product_image"
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
                    <p>Rp{{ formatRupiah(check.price) }}</p>
                  </div>

                  <UiNumberField
                    class="border border-foreground max-w-28"
                    :model-value="check.quantity"
                    :min="1"
                    @update:model-value="(val) => cartStore.updateCart(check.id, {quantity: val})"
                  >
                    <UiNumberFieldContent>
                      <UiNumberFieldDecrement />
                      <UiNumberFieldInput class="text-sm rounded-none" />
                      <UiNumberFieldIncrement />
                    </UiNumberFieldContent>
                  </UiNumberField>
                </div>
              </div>

              <div class="flex justify-center items-center">
                <button @click="cartStore.removeCart(check.id)" class="h-fit">
                  <Trash2 class="text-destructive cursor-pointer" />
                </button>
              </div>
            </div>
          </template>

          <h3
            v-else
            class="flex justify-center text-muted-foreground text-xl mt-4"
          >
            Your cart is empty.
          </h3>
        </div>
      </div>

      <div class="bg-secondary grid gap-2 p-2 rounded-xl">
        <div class="flex justify-between items-center">
          <h2 class="text-xl">Subtotal</h2>
          <p class="text-sm font-bold">
            Rp{{ formatRupiah(totalPrice) }}
          </p>
        </div>
        <UiButton :disabled="cartStore.selectedCart.length === 0"> Checkout </UiButton>
      </div>
    </div>
  </section>
</template>

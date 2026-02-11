<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import { useCart } from "~/composables/cart/useCart";
import { useDeleteCart } from "~/composables/cart/useDeleteCart";
import { useEditCart } from "~/composables/cart/useEditCart";
import { formatRupiah } from "~/lib/utils";
import { useCartStore } from "~/store/CartStore";
import type { CheckoutProductType } from "~/types/checkout";

const cartStore = useCartStore();
const {
  data: cart,
  isLoading: isLoadingCart,
  error: errorCart,
  isError,
} = useCart();
const {
  updateQuantity,
  isPending: isPendingEdit,
  error: errorEdit,
} = useEditCart();
const {
  mutate,
  isPending: isPendingDelete,
  error: errorDelete,
} = useDeleteCart();

if (isError.value) {
  throw errorCart;
}

watch(cart, (val) => {
  if (val) {
    cartStore.cart = val;
  }
});

const totalPrice = computed(() => {
  return cartStore.selectedCart.reduce(
    (total, item) => total + item.variant.price * (item.quantity || 0),
    0,
  );
});
</script>

<template>
  <UiSheet>
    <UiSheetTrigger class="cursor-pointer relative">
      <slot />
    </UiSheetTrigger>
    <UiSheetContent>
      <UiSheetHeader>
        <UiSheetTitle class="text-3xl">Shopping Cart</UiSheetTitle>
      </UiSheetHeader>

      <div
        class="flex flex-col gap-6 overflow-y-auto h-[calc(100dvh-260px)] px-4"
      >
        <template v-if="isLoadingCart">
          <UiSkeleton class="w-full h-28" />
        </template>

        <template v-if="(cartStore.cart?.length || 0) > 0">
          <label
            v-for="check in cartStore.cart"
            class="flex justify-between gap-2 cursor-pointer"
          >
            <div class="flex gap-2 md:gap-6 justify-center items-center">
              <UiCheckbox
                class="border-2 border-foreground"
                :model-value="
                  cartStore.selectedCart.some(
                    (item: CheckoutProductType) => item.id === check.id,
                  )
                "
                @update:model-value="cartStore.orderCart(check)"
              />
              <div class="size-20 aspect-square">
                <NuxtImg
                  :src="check.product.product_images"
                  :alt="check.product.name"
                  class="w-full h-full object-cover object-center outline-hidden"
                />
              </div>

              <div class="grid gap-2">
                <div class="p-1 bg-secondary w-fit">
                  {{ check.product.category
                  }}{{
                    check.variant.variant !== check.product.category
                      ? `, ${check.variant.variant}`
                      : ""
                  }}
                </div>

                <div class="grid">
                  <h3 class="text-lg truncate">{{ check.product.name }}</h3>
                  <p>Rp{{ formatRupiah(check.variant.price) }}</p>
                </div>

                <div class="grid gap-1">
                  <UiNumberField
                    class="border border-foreground max-w-28"
                    :model-value="check.quantity"
                    :min="1"
                    :max="check.variant.stock"
                    :disabled="isPendingEdit"
                    @update:model-value="
                      (val: number) => {
                        const currentQty = cartStore.getQuantity(check.id);
                        cartStore.updateCart(check.id, {
                          quantity: val,
                          price: val * check.variant.price,
                        });
                        if (val !== currentQty) {
                          updateQuantity(check.id, val);
                        }
                      }
                    "
                  >
                    <UiNumberFieldContent>
                      <UiNumberFieldDecrement class="cursor-pointer" />
                      <UiNumberFieldInput class="text-sm rounded-none" />
                      <UiNumberFieldIncrement class="cursor-pointer" />
                    </UiNumberFieldContent>
                  </UiNumberField>
                  <p v-if="errorEdit" class="text-xs text-destructive">
                    Failed to update quantity
                  </p>
                </div>
              </div>
            </div>

            <div class="flex justify-center items-center gap-2">
              <button
                @click="mutate(check.id)"
                :disabled="isPendingDelete"
                class="h-fit disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2
                  :class="[
                    isPendingDelete
                      ? 'text-muted-foreground'
                      : 'text-destructive',
                    'cursor-pointer',
                  ]"
                />
              </button>
              <p v-if="errorDelete" class="text-xs text-destructive">
                Failed to delete
              </p>
            </div>
          </label>
        </template>

        <h3
          v-else
          class="flex justify-center text-muted-foreground text-xl mt-4"
        >
          Your cart is empty.
        </h3>
      </div>

      <UiSheetFooter>
        <div class="bg-secondary grid gap-2 p-2 rounded-xl">
          <div class="flex justify-between items-center">
            <h2 class="text-xl">Subtotal</h2>
            <p class="text-sm font-bold">Rp{{ formatRupiah(totalPrice) }}</p>
          </div>
          <UiButton :disabled="cartStore.selectedCart.length === 0" class="p-0">
            <NuxtLink
              class="w-full h-full py-2"
              to="/checkout"
              @click="
                cartStore.checkoutCart(cartStore.selectedCart);
                cartStore.clearOrder();
              "
            >
              Checkout
            </NuxtLink>
          </UiButton>
        </div>
      </UiSheetFooter>
    </UiSheetContent>
  </UiSheet>
</template>

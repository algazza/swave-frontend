<script setup lang="ts">
import { ChevronLeft, Home, MapPin } from "lucide-vue-next";
import { addressSingle, checkoutArray } from "~/lib/data";
import type { AddressType } from "~/types/address";

definePageMeta({
  layout: "checkout",
});

const router = useRouter();
const address: AddressType = addressSingle;
const checkbox = ref(true);

const totalProduct = checkoutArray.reduce((sum, item) => sum + item.quantity, 0)
const totalQuantity = checkoutArray.reduce((sum, item) => sum + item.total_price, 0)

const goBack = () => {
  router.back();
};
</script>

<template>
  <form class="pb-20">
    <div class="flex gap-2 py-5 items-center justify-start">
      <button @click="goBack">
        <ChevronLeft class="size-8" />
      </button>
      <h2 class="text-2xl">Checkout</h2>
    </div>

    <div class="flex flex-col gap-5 lg:flex-row">
      <div class="grid gap-5 flex-1 lg:h-fit">
        <div class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <div class="flex justify-between items-center">
            <span class="text-2xl font-semibold">Address</span>
            <span v-if="address" class="font-bold underline">Change</span>
          </div>
          <div v-if="address" class="grid gap-1">
            <div class="flex justify-start items-center gap-2">
              <div
                class="p-1 bg-secondary rounded-md flex items-center justify-center gap-2"
              >
                <Home />
                <span class="font-semibold">
                  {{ address.label }}
                </span>
              </div>
              <div
                v-if="address.main_address === true"
                class="p-1 border border-foreground rounded-md flex items-center justify-center gap-2"
              >
                <MapPin />
                <span class="font-semibold">Main Address</span>
              </div>
            </div>
            <p class="text-lg font-semibold">{{ address.recipient }}</p>
            <p>
              {{ address.address }}, {{ address.subdistrict }},
              {{ address.city }}, {{ address.zip_code }}
            </p>
          </div>

          <p v-else class="text-muted-foreground">
            No Address available. Please add an address
          </p>
          <UiButton v-if="!address" class="bg-foreground text-background"
            >+ Add Address</UiButton
          >
        </div>

        <div class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Product Checkout</p>

          <div v-for="check in checkoutArray" class="grid gap-3">
            <div class="flex gap-5">
              <div class="size-20 aspect-square overflow-hidden">
                <NuxtImg
                  :src="check.product.image"
                  :alt="check.product.name"
                  class="w-full h-full object-cover object-center outline-hidden"
                />
              </div>

              <div class="w-full flex justify-between items-end">
                <div class="grid">
                  <div class="p-1 bg-secondary w-fit">
                    {{ check.product.categories }}
                    {{
                      check.variant !== check.product.categories
                        ? `, ${check.variant}`
                        : ""
                    }}
                  </div>

                  <h2 class="text-xl mt-2 mb-1">{{ check.product.name }}</h2>
                  <p class="">Rp {{ check.product.price }}</p>
                </div>
                <span class="text-xs">Stok: {{ check.quantity }}</span>
              </div>
            </div>

            <div class="content-[''] h-[1px] w-full bg-foreground" />

            <div class="flex justify-between items-center">
              <span>Total Checkout:</span>
              <span class="font-bold">Rp {{ check.total_price }}</span>
            </div>
          </div>
        </div>

        <div class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Delivery</p>

          <UiSelect>
            <UiSelectTrigger
              class="border-2 border-foreground text-foreground w-full"
            >
              <UiSelectValue placeholder="Select Delivery" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem value="pickup" class="flex gap-2 font-semibold">
                  <span>Pick Up at SMK 8 Semarang </span>
                  <span class="text-muted-foreground">(Rp 0)</span>
                </UiSelectItem>
                <UiSelectItem value="delivery" class="flex gap-2 font-semibold">
                  <span>Delivery </span>
                  <span class="text-muted-foreground">(Rp 20000)</span>
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>

          <p class="text-2xl font-semibold">Pick Date and Time</p>
          <div class="flex gap-3 w-full">
            <div class="flex font-bold gap-2 items-center">
              <UiInput
                class="border-2 border-foreground"
                type="number"
                min="0"
                max="2"
              />
              :
              <UiInput
                class="border-2 border-foreground"
                type="number"
                min="0"
                max="10"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-5 flex-1 lg:h-fit">
        <div class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Description (optional)</p>
          <UiTextarea
            placeholder="Description"
            class="border-2 border-secondary resize-none"
          />

          <div class="flex items-center gap-2">
            <UiCheckbox
              id="gift_card"
              class="border-2 border-foreground"
              v-model="checkbox"
            />
            <UiLabel for="gift-card" class="text-sm">Gift Card</UiLabel>
          </div>

          <div v-if="checkbox">
            <p class="text-2xl font-semibold">Gift Card Description</p>
            <UiTextarea
              placeholder="Dear God.."
              class="border-2 border-secondary resize-none"
            />
          </div>
        </div>

        <div class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Invoice</p>
          <div class="grid gap-2">
            <div class="flex justify-between">
              <p>Total Price ({{ totalProduct }} product)</p>
              <p class="font-bold">Rp. {{ totalQuantity }}</p>
            </div>
            <div class="flex justify-between">
              <p>Total Delivery Cost</p>
              <p class="font-bold">Rp. 20000</p>
            </div>
            <div class="content-[''] h-[1px] w-full bg-foreground"/>
            <div class="flex justify-between text-xl">
              <p>Total Payment</p>
              <p class="font-bold">Rp. 70000</p>
            </div>
            <UiButton class="w-full">Chose Payment</UiButton>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

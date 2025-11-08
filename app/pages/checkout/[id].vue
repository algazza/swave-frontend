<script setup lang="ts">
definePageMeta({
  layout: "checkout",
});

import { ref } from "vue";
import type { CalendarDate, DateValue } from "@internationalized/date";
import {
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date";

import { ChevronLeft, Clock, Home, MapPin } from "lucide-vue-next";
import { CalendarIcon } from "lucide-vue-next";

import { addressSingle, checkoutArray } from "~/lib/data";
import { cn } from "~/lib/utils";
import { formatRupiah } from "~/lib/utils";
import type { AddressType } from "~/types/address";

const df = new DateFormatter("id-ID", {
  dateStyle: "long",
});

const router = useRouter();
const value = ref<DateValue>();
const deliveryType = ref("");
const time = ref("");
const checkbox = ref(true);

const address: AddressType = addressSingle;
const deliveryCost = 20000;

const totalProduct = checkoutArray.reduce(
  (sum, item) => sum + item.quantity,
  0
);
const totalQuantity = checkoutArray.reduce(
  (sum, item) => sum + item.total_price,
  0
);

const onInput = (e: Event) => {
  let val = (e.target as HTMLInputElement).value.replace(/\D/g, "");

  if (val.length >= 3) val = val.slice(0, 2) + ":" + val.slice(2, 4);
  else if (val.length > 2) val = val.slice(0, 2) + ":" + val.slice(2);

  const [h, m] = val.split(":").map(Number);
  if ((h ?? 0) > 23)
    val = "23:" + (m ? String(m).padStart(2, "0").slice(0, 2) : "");
  if ((m ?? 0) > 59)
    val = (String(h).padStart(2, "0").slice(0, 2) || "00") + ":59";

  time.value = val.slice(0, 5);
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="pb-20">
    <div class="flex gap-2 py-5 items-center justify-start">
      <button @click="goBack">
        <ChevronLeft class="size-8" />
      </button>
      <h2 class="text-2xl">Checkout</h2>
    </div>

    <form class="flex flex-col gap-5 lg:flex-row">
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
                    {{ check.product.categories
                    }}{{
                      check.variant !== check.product.categories
                        ? `, ${check.variant}`
                        : ""
                    }}
                  </div>

                  <h2 class="text-xl mt-2 mb-1">{{ check.product.name }}</h2>
                  <p class="">Rp{{ formatRupiah(check.product.price) }}</p>
                </div>
                <span class="text-xs">Stok: {{ check.quantity }}</span>
              </div>
            </div>

            <div class="content-[''] h-[1px] w-full bg-foreground" />

            <div class="flex justify-between items-center">
              <span>Total Checkout:</span>
              <span class="font-bold"
                >Rp{{ formatRupiah(check.total_price) }}</span
              >
            </div>
          </div>
        </div>

        <div class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Delivery</p>

          <UiSelect v-model="deliveryType">
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
                  <span class="text-muted-foreground"
                    >(Rp{{ formatRupiah(deliveryCost) }})</span
                  >
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>

          <p v-if="deliveryType === 'pickup'" class="text-2xl font-semibold">Pick Date and Time</p>
          <div v-if="deliveryType === 'pickup'" class="flex gap-3 w-full">
            <UiPopover>
              <UiPopoverTrigger as-child>
                <UiButton
                  variant="outline"
                  :class="
                    cn(
                      'w-full justify-start text-left font-normal flex-1 border-2 border-foreground',
                      !value && 'text-muted-foreground'
                    )
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  {{
                    value
                      ? df.format(value.toDate(getLocalTimeZone()))
                      : "Pick a date"
                  }}
                </UiButton>
              </UiPopoverTrigger>
              <UiPopoverContent class="w-auto p-0">
                <UiCalendar
                  :min-value="today(getLocalTimeZone()).add({ days: 4 })"
                  v-model="value"
                  initial-focus
                />
              </UiPopoverContent>
            </UiPopover>

            <div class="flex gap-2 items-center flex-1">
              <UiInputGroup class="border-2 border-foreground px-2">
                <UIInputGroupAddon>
                  <Clock class="size-5 text-muted-foreground" />
                </UIInputGroupAddon>
                <UiInputGroupInput
                  v-model="time"
                  @input="onInput"
                  placeholder="hh:mm"
                  maxlength="5"
                />
              </UiInputGroup>
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
              <p class="font-bold">Rp{{ formatRupiah(totalQuantity) }}</p>
            </div>
            <div class="flex justify-between">
              <p>Total Delivery Cost</p>
              <p class="font-bold">Rp{{ formatRupiah(deliveryCost) }}</p>
            </div>
            <div class="content-[''] h-[1px] w-full bg-foreground" />
            <div class="flex justify-between text-xl">
              <p>Total Payment</p>
              <p class="font-bold">Rp{{ formatRupiah(60000) }}</p>
            </div>
            <UiButton class="w-full">Chose Payment</UiButton>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

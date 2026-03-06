<script setup lang="ts">
import {
  Calendar,
  ChevronLeft,
  Clock,
  Copy,
  Home,
  MapPin,
} from "lucide-vue-next";
import { useDetailCheckout } from "~/composables/checkout/useDetailCheckout";
import { copyOrderID, formatRupiah, sumValue } from "~/lib/utils";
import { push } from "notivue";

const router = useRouter();
const route = useRoute();
const paramId = computed(() => route.params.slug as string);
const { data, isLoading, isError, error } = useDetailCheckout(paramId);
if (isError.value) {
  throw error;
}

const totalProduct = computed(() =>
  sumValue(data.value?.product_checkout ?? [], (item) => item.quantity),
);
</script>

<template>
  <section class="pb-20">
    <div class="flex gap-2 py-5 items-center justify-start">
      <button @click="router.back()" class="cursor-pointer">
        <ChevronLeft class="size-8" />
      </button>
      <h2 class="text-2xl">Checkout History</h2>
    </div>
    <template v-if="isLoading">
      <UiSkeleton class="w-full h-8 md:h-10" />
    </template>

    <div v-else class="md:flex items-center justify-between">
      <div class="flex items-center gap-2 md:gap-4 md:text-xl font-medium">
        <p>Order Id: {{ data?.order_id }}</p>
        <button @click="copyOrderID(data?.order_id!)" class="cursor-pointer">
          <Copy class="size-5" />
        </button>
      </div>
      <span
        class="text-xl md:text-2xl lg:text-3xl font-semibold capitalize"
        :class="
          data?.status.at(-1)?.order_status === 'pending'
            ? 'text-success-purple'
            : data?.status.at(-1)?.order_status === 'processing'
              ? 'text-accent'
              : data?.status.at(-1)?.order_status === 'delivery'
                ? 'text-success-blue'
                : data?.status.at(-1)?.order_status === 'success'
                  ? 'text-success-green'
                  : 'text-destructive'
        "
        >{{ data?.status.at(-1)?.order_status }}</span
      >
    </div>

    <template v-if="isLoading">
      <UiSkeleton class="w-full h-86 md:h-40 my-4" />
    </template>
    <AccountTransactionStepper v-else-if="data?.status" :statusData="data?.status"/>

    <div class="flex flex-col gap-5 lg:flex-row">
      <div class="grid gap-5 flex-1 lg:h-fit">
        <section class="space-y-2 p-4 border-2 border-secondary rounded-xl">
          <div class="flex justify-between items-center">
            <span class="text-xl font-semibold md:text-2xl">Address</span>
          </div>
          <template v-if="isLoading">
            <UiSkeleton class="w-full h-30" />
          </template>

          <div v-else-if="data?.delivery.address" class="grid gap-1">
            <p class="text-[16px] font-semibold md:text-xl">
              {{ data?.delivery.address.recipient }}
            </p>
            <p>
              {{ data?.delivery.address.address }},
              {{ data?.delivery.address.subdistrict }},
              {{ data?.delivery.address.city }},
              {{ data?.delivery.address.zip_code }}
            </p>
          </div>
        </section>

        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Product Checkout</p>
          <template v-if="isLoading">
            <UiSkeleton class="w-full h-40" />
          </template>
          <div v-for="check in data?.product_checkout" class="grid gap-3">
            <div class="flex gap-5">
              <div class="size-20 shrink-0 overflow-hidden">
                <NuxtImg
                  :src="check.image_path"
                  :alt="check.name"
                  class="w-full h-full object-cover object-center outline-hidden"
                />
              </div>

              <div class="w-full flex justify-between items-end">
                <div class="grid">
                  <div class="p-1 bg-secondary w-fit">
                    {{ check.category
                    }}{{
                      check.variant !== check.category
                        ? `, ${check.variant}`
                        : ""
                    }}
                  </div>

                  <h2 class="text-xl mt-2 mb-1">{{ check.name }}</h2>
                  <p class="">Rp{{ formatRupiah(check.variant_price) }}</p>
                </div>
                <span class="text-xs">Stok: {{ check.quantity }}</span>
              </div>
            </div>

            <div class="content-[''] h-px w-full bg-foreground" />

            <div class="flex justify-between items-center">
              <span>Total Checkout:</span>
              <span class="font-bold"
                >Rp{{ formatRupiah(check.total_price) }}</span
              >
            </div>
          </div>
        </section>
      </div>

      <div class="grid gap-5 flex-1 lg:h-fit">
        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Delivery</p>
          <template v-if="isLoading">
            <UiSkeleton class="w-full h-10" />
          </template>

          <div
            v-else
            class="border-2 border-foreground text-foreground w-full p-2 rounded-md"
          >
            {{
              data?.delivery.delivery_type === "delivery"
                ? "Delivery"
                : "Pick Up at SMK 8 Semarang"
            }}
          </div>

          <p
            v-if="data?.delivery.delivery_type === 'pickup'"
            class="text-2xl font-semibold"
          >
            Pick Date and Time
          </p>
          <div
            id="gift_card"
            v-if="data?.delivery.delivery_type === 'pickup'"
            class="flex gap-3 w-full items-start"
          >
            <div
              class="w-full flex gap-4 items-center border-2 border-foreground p-2 rounded-md"
            >
              <Calendar class="size-5 text-muted-foreground" />
              <span>
                {{ data?.delivery.pickup_date }}
              </span>
              <div class=""></div>
            </div>

            <div
              class="w-full flex gap-4 items-center border-2 border-foreground p-2 rounded-md"
            >
              <Clock class="size-5 text-muted-foreground" />
              <span>{{ data.delivery.pickup_hour }}</span>
            </div>
          </div>
        </section>

        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <template v-if="isLoading">
            <div>
              <p class="text-2xl font-semibold">Description</p>
              <UiSkeleton class="w-full h-30" />
            </div>
          </template>

          <div v-else-if="data?.description !== null" class="space-y-2">
            <p class="text-2xl font-semibold">Description</p>

            <div
              v-if="data?.description !== null"
              class="border-2 border-secondary resize-none rounded-md p-2"
            >
              {{ data?.description }}
            </div>
          </div>

          <div class="space-y-2">
            <p class="text-2xl font-semibold">Gift Card</p>
            <template v-if="isLoading">
              <UiSkeleton class="w-full h-30" />
            </template>
            <div
              v-else
              class="flex items-center gap-2 mt-2 pointer-events-none cursor-default"
            >
              <UiCheckbox
                class="border-2 border-foreground"
                :model-value="data?.gift_card"
              />
              <UiLabel class="text-sm">Gift Card</UiLabel>
            </div>
            <div
              v-if="data?.gift_card"
              class="border-2 border-secondary resize-none rounded-md p-2"
            >
              {{ data?.gift_description }}
            </div>
          </div>
        </section>

        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Invoice</p>
          <template v-if="isLoading">
            <UiSkeleton class="w-full h-40" />
          </template>
          <div v-else class="grid gap-2">
            <div class="flex justify-between">
              <p>Total Price ({{ totalProduct }} product)</p>
              <p class="font-bold">
                Rp{{ formatRupiah(data?.total_price || 0) }}
              </p>
            </div>
            <div
              v-if="data?.delivery.delivery_type === 'delivery'"
              class="flex justify-between"
            >
              <p>Total Delivery Cost</p>
              <p v-if="data?.delivery.delivery_price" class="font-bold">
                Rp{{ formatRupiah(data?.delivery.delivery_price || 0) }}
              </p>
            </div>
            <div class="content-[''] h-px w-full bg-foreground" />
            <div class="flex justify-between text-lg md:text-xl">
              <p>Total Payment</p>
              <UiSkeleton v-if="isLoading" class="w-36 h-8" />
              <p
                v-else-if="
                  data?.delivery.delivery_price &&
                  data?.delivery.delivery_type === 'delivery'
                "
                class="font-bold"
              >
                Rp{{
                  formatRupiah(
                    data?.total_price + data?.delivery.delivery_price,
                  )
                }}
              </p>
              <p v-else class="font-bold">
                Rp{{ formatRupiah(data?.total_price || 0) }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formatDate, formatRupiah } from "~/lib/utils";
import type { CheckoutHistoryType } from "~/types/checkout";

const props = defineProps<{
  data: CheckoutHistoryType;
}>();
</script>

<template>
  <NuxtLink :to="`/account/transaction/${data.order_id}`">
    <div class="space-y-4 p-4 border-2 border-secondary rounded-xl">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl">{{ formatDate(data.created_at) }}</h2>
        <span
          class="text-xl font-semibold capitalize"
          :class="
            data.status === 'pending'
              ? 'text-success-purple'
              : data.status === 'processing'
              ? 'text-accent'
              : data.status === 'delivery'
              ? 'text-success-blue'
              : data.status === 'success'
              ? 'text-success-green'
              : 'text-destructive'
          "
          >{{ data.status }}</span
        >
      </div>

      <div v-for="product in data.products" class="space-y-2">
        <div class="flex gap-5 w-full">
          <div class="size-20 aspect-square">
            <NuxtImg
              :src="product.image_path"
              :alt="product.name"
              class="object-center object-cover w-full h-full overflow-hidden"
            />
          </div>
          <div class="flex justify-between items-end w-full">
            <div class="space-y-2">
              <div class="p-1 bg-secondary w-fit">
                {{ product.category
                }}{{
                  product.variant !== product.category
                    ? `, ${product.variant}`
                    : ""
                }}
              </div>
              <div class="grid">
                <h3 class="text-lg truncate">{{ product.name }}</h3>
                <p>Rp{{ formatRupiah(product.variant_price) }}</p>
              </div>
            </div>
            <span class="text-xs">quantity: {{ product.quantity }}</span>
          </div>
        </div>
        <UiSeparator class="w-full h-px" />
        <div class="flex justify-between items-center w-full">
          <span class="text-sm">Total Checkout:</span>
          <span class="text-sm font-bold">{{
            formatRupiah(product.total_price)
          }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

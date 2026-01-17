<script setup lang="ts">
import { formatDate, formatRupiah } from "~/lib/utils";
import type { UnreviewHistoryType } from "~/types/review";

const props = defineProps<{
  data: UnreviewHistoryType;
}>();
</script>

<template>
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

    <div class="space-y-2">
      <div class="flex gap-5 w-full">
        <div class="size-20 aspect-square">
          <NuxtImg
            :src="data.product.product_images"
            :alt="data.product.product_name"
            class="object-center object-cover w-full h-full overflow-hidden"
          />
        </div>
        <div class="flex justify-between items-end w-full">
          <div class="space-y-2">
            <div class="p-1 bg-secondary w-fit text-xs">
              {{ data.product.category
              }}{{
                data.product.variant !== data.product.category
                  ? `, ${data.product.variant}`
                  : ""
              }}
            </div>
            <div class="grid">
              <h3 class="text-lg truncate">
                {{ data.product.product_name }}
              </h3>
              <p>Rp{{ formatRupiah(data.product.price) }}</p>
            </div>
          </div>
          <span class="text-xs">quantity: {{ data.product.quantity }}</span>
        </div>
      </div>
      <UiSeparator class="w-full h-px" />
      <div class="flex justify-between items-center w-full">
        <span class="text-sm">Total Checkout:</span>
        <span class="text-sm font-bold">{{
          formatRupiah(data.product.price * data.product.quantity)
        }}</span>
      </div>
    </div>

    <AccountReviewAddDialog
      :order-id="data.order_id"
      :product-id="data.product.product_id"
      :product-img="data.product.product_images"
      :product-name="data.product.product_name"
      :product-variant="data.product.variant"
      :product-category="data.product.category"
    >
      <UiButton class="w-full"> Review Product </UiButton>
    </AccountReviewAddDialog>
  </div>
</template>

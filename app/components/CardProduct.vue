<script setup lang="ts">
import { Star } from "lucide-vue-next";
import { formatRupiah, isLocalImagePath } from "~/lib/utils";
import type { ProductType } from "~/types/product";

const props = defineProps<{
  product: ProductType;
}>();

const API_URL = useRuntimeConfig().public.API_URL;
</script>

<template>
  <NuxtLink :to="`/product/${product.slug}`" class="grid gap-3 w-full">
    <div class="aspect-square overflow-hidden">
      <NuxtImg
        :src="
          isLocalImagePath(product.product_images)
            ? `${API_URL}/${product.product_images}`
            : product.product_images
        "
        :alt="product.name"
        class="w-full h-full object-contain object-center overflow-hidden"
      />
    </div>

    <div class="grid gap-1 ">
      <span class="text-muted-foreground font-semibold">
        {{ product.category }}
      </span>
      <h2 class="font-ramabhadra text-base">{{ product.name }}</h2>
      <span class="font-semibold"
        >Rp{{ formatRupiah(product.price || 0) }}</span
      >
      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center font-semibold">
          <Star class="text-accent" />
          <span>{{ product.star }}</span>
        </div>
        <span class="">{{ product.sold }} sold</span>
      </div>
    </div>
  </NuxtLink>
</template>

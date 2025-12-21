<script setup lang="ts">
import { Star } from "lucide-vue-next";
import type { ProductType } from "~/types/product";

defineProps<{
  product: ProductType;
}>();
</script>

<template>
  <NuxtLink to="/product/1">
    <div class="grid gap-3">
      <div class="aspect-square overflow-hidden">
        <NuxtImg
          :src="product.product_image"
          :alt="product.name"
          class="w-full h-full object-cover object-center overflow-hidden"
        />
      </div>

      <div class="grid gap-1">
        <span class="text-muted-foreground font-semibold">
          {{ product.categories }}
        </span>
        <h2 class="font-ramabhadra text-base">{{ product.name }}</h2>
        <span class="">Rp{{ product.price }}</span>
        <div class="flex gap-2 items-center">
          <Star class="text-accent" />
          <span class="font-semibold">{{ product.star }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

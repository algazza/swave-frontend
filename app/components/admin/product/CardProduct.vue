<script setup lang="ts">
import { Star, X } from "lucide-vue-next";
import { useDeleteProduct } from "~/composables/product/useDeleteProduct";
import { formatRupiah, isLocalImagePath } from "~/lib/utils";
import type { ProductType } from "~/types/product";

const props = defineProps<{
  product: ProductType;
}>();

const API_URL = useRuntimeConfig().public.API_URL;
const { mutate, isPending, error } = useDeleteProduct();

const handleDelete = async () => {
  if (isPending.value) return;

  try {
    await mutate(props.product.id);
  } catch (err) {
    console.error("Failed to delete product:", err);
  }
};
</script>

<template>
  <div class="relative">
    <AdminProductDialogDelete @confirm="handleDelete" :title="product.name">
      <div
        class="absolute z-10 top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer"
      >
        <X class="size-6" />
      </div>
    </AdminProductDialogDelete>
    <NuxtLink :to="`/admin/product/${product.slug}`" class="grid gap-3 w-full">
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

      <div class="grid gap-1">
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
  </div>
</template>

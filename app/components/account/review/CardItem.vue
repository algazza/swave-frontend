<script setup lang="ts">
import { Star } from "lucide-vue-next";
import { formatDate } from "~/lib/utils";
import type { ReviewHistoryType } from "~/types/review";

const props = defineProps<{
  item: ReviewHistoryType;
}>();
</script>

<template>
  <div
    class="border border-foreground flex gap-5 p-4 rounded-xl flex-col md:flex-row-reverse max-w-full"
  >
    <div class="space-y-2 flex-1">
      <div class="p-1 bg-secondary w-fit text-xs">
        {{ item.product.category
        }}{{
          item.product.variant !== item.product.category
            ? `, ${item.product.variant}`
            : ""
        }}
      </div>
      <h2 class="text-2xl break-all">{{ item.user.name }}</h2>
      <div class="flex gap-2">
        <Star
          v-for="i in 5"
          :class="i <= item.star ? 'text-accent' : 'text-secondary'"
        />
      </div>
      <p class="font-medium text-base break-all">"{{ item.description }}"</p>
    </div>
    <div class="flex gap-2 items-center w-full md:flex-col md:w-45">
      <div class="size-20 aspect-square">
        <NuxtImg
          :src="item.product.image_path"
          :alt="item.product.name"
          class="w-full h-full object-cover object-center outline-hidden"
        />
      </div>
      <div class="space-y-1 w-full">
        <h3 class="text-xl truncate">{{ item.product.name }}</h3>
        <p class="">{{ formatDate(item.created_at) }}</p>
      </div>
    </div>
  </div>
</template>

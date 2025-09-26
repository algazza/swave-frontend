<script setup lang="ts">
import { Search, Star } from "lucide-vue-next";
import { dummyProduct, filterArray } from "~/lib/data";
</script>

<template>
  <section class="px-4 py-10 grid gap-5">
    <div class="grid gap-2">
      <h1 class="text-4xl">Filter</h1>
      <div class="border-[1px] px-3 py-2">
        <h2 class="text-2xl mb-3">Sorting by</h2>
        <UiSelect>
          <UiSelectTrigger class="w-full bg-secondary">
            <UiSelectValue placeholder="Select a filter" />
          </UiSelectTrigger>
          <UiSelectContent class="bg-secondary">
            <UiSelectGroup>
              <UiSelectItem v-for="filter in filterArray" :value="filter">
                {{ filter }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </div>

      <div class="border-[1px] border-border px-3 py-2">
        <h2 class="text-2xl mb-3">Category</h2>
        <Button class="bg-foreground text-background flex justify-between w-full py-2 px-4 rounded-xl">
          <span>Hat</span> <span>(5)</span>
        </Button>
      </div>
    </div>

    <div class="grid gap-6">
      <div class="relative w-full items-center">
        <UiInput
          id="search"
          type="text"
          placeholder="Search..."
          class="pl-[50px] rounded-3xl bg-secondary"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-4"
        >
          <Search class="size-6" />
        </span>
      </div>

      <div class="grid grid-cols-2 gap-y-6 gap-x-2">
        <div v-for="product in dummyProduct" class="grid gap-3">
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
            <span class="font-semibold">Rp. {{ product.price }}</span>
            <div class="flex gap-2">
              <Star class="text-[#B38F6F]"/>
              <span>{{ product.review }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

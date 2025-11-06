<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { filterArray } from "~/lib/constanta";
import { dummyProduct } from "~/lib/data";
</script>

<template>
  <section class="py-10 flex flex-col gap-5 lg:flex-row lg:gap-20 lg:items-start">
    <div class="grid gap-2 lg:min-w-[400px]">
      <h1 class="text-4xl">Filter</h1>
      <div class="border px-3 py-2">
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

      <div class="border border-border px-3 py-2">
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

      <div class="grid grid-cols-2 gap-y-6 gap-x-2 md:grid-cols-3">
        <CardProduct v-for="product in dummyProduct" :product="product" />
      </div>
    </div>
  </section>
</template>

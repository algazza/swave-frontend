<script setup lang="ts">
import { ListFilter, Search, X } from "lucide-vue-next";
import { useCategory } from "~/composables/category/useCategory";
import { useProducts } from "~/composables/product/useProducts";
import { filterArray } from "~/lib/constanta";
import type { ProductType } from "~/types/product";

const {
  data: categories,
  isPending: isCategoriesPending,
  error: categoriesError,
  isError: isCategoriesError,
} = useCategory();
const { data, isPending, error, isError } = useProducts();
if (isError.value) {
  throw error;
} else if (isCategoriesError.value) {
  throw categoriesError;
}

const search = ref("");
const sortBy = ref<string>("");
const selectedCategories = ref<string[]>([]);
const isFilterSheetOpen = ref(false);

const toggleCategory = (category: string) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(
      (c) => c !== category,
    );
  } else {
    selectedCategories.value = [...selectedCategories.value, category];
  }
};

const filteredProducts = computed<ProductType[]>(() => {
  const products = (data.value || []).filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.value.toLowerCase());

    const matchesCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(item.category);

    return matchesSearch && matchesCategory;
  });

  const sorted = [...products];

  switch (sortBy.value) {
    case "Best Selling":
      return sorted.sort((a, b) => b.sold - a.sold);
    case "Average Rating":
      return sorted.sort((a, b) => b.star - a.star);
    case "A - Z":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "Z - A":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "Cheap":
      return sorted.sort((a, b) => a.price - b.price);
    case "Expensive":
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return products;
  }
});
</script>

<template>
  <section
    class="py-10 flex flex-col gap-5 lg:flex-row lg:gap-20 lg:items-start relative"
  >
    <div
      class="flex-col flex-1 gap-2 lg:min-w-100 bg-background hidden lg:flex"
    >
      <div class="border px-3 py-2">
        <h2 class="text-2xl mb-3">Sorting by</h2>
        <UiSelect v-model="sortBy">
          <UiSelectTrigger class="w-full border border-border cursor-pointer">
            <UiSelectValue placeholder="Select a filter" />
          </UiSelectTrigger>
          <UiSelectContent class="bg-background">
            <UiSelectGroup>
              <UiSelectItem
                v-for="filter in filterArray"
                :key="filter"
                :value="filter"
                class="cursor-pointer"
              >
                {{ filter }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </div>

      <template v-if="isCategoriesPending">
        <UiSkeleton class="w-full h-100" />
      </template>
      <div
        v-else-if="(categories?.length || 0) > 1"
        class="border border-border px-3 py-2 space-y-2"
      >
        <h2 class="text-2xl mb-3">Category</h2>
        <label
          v-for="category in categories || []"
          :key="category.category"
          class="flex items-center justify-between w-full py-2 px-4 rounded-xl cursor-pointer bg-secondary gap-3"
        >
          <div class="flex items-center gap-3">
            <UiCheckbox
              class="border-foreground cursor-pointer"
              :model-value="selectedCategories.includes(category.category)"
              @update:model-value="toggleCategory(category.category)"
            />
            <span>{{ category.category }}</span>
          </div>
          <span>({{ category.count }})</span>
        </label>
      </div>
    </div>

    <div class="grid gap-6 w-full">
      <div class="flex gap-4 items-center">
        <UiSheet v-model:open="isFilterSheetOpen">
          <UiSheetTrigger as-child>
            <button class="lg:hidden flex items-center gap-2 shrink-0">
              <ListFilter />
            </button>
          </UiSheetTrigger>
          <UiSheetContent side="left" class="w-[80vw] max-w-80">
            <UiSheetHeader>
              <h1 class="text-4xl">Filter</h1>
            </UiSheetHeader>

            <div class="space-y-4 mt-6">
              <div class="border px-3 py-2">
                <h2 class="text-2xl mb-3">Sorting by</h2>
                <UiSelect v-model="sortBy">
                  <UiSelectTrigger
                    class="w-full border border-border cursor-pointer"
                  >
                    <UiSelectValue placeholder="Select a filter" />
                  </UiSelectTrigger>
                  <UiSelectContent class="bg-background">
                    <UiSelectGroup>
                      <UiSelectItem
                        v-for="filter in filterArray"
                        :key="filter"
                        :value="filter"
                        class="cursor-pointer"
                      >
                        {{ filter }}
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
              </div>

              <template v-if="isCategoriesPending">
                <UiSkeleton class="w-full h-100" />
              </template>

              <div
                v-if="(categories?.length || 0) > 1"
                class="border border-border px-3 py-2 space-y-2"
              >
                <h2 class="text-2xl mb-3">Category</h2>

                <label
                  v-for="category in categories || []"
                  :key="category.category"
                  class="flex items-center justify-between w-full py-2 px-4 rounded-xl cursor-pointer bg-secondary gap-3"
                >
                  <div class="flex items-center gap-3">
                    <UiCheckbox
                      :model-value="
                        selectedCategories.includes(category.category)
                      "
                      @update:model-value="toggleCategory(category.category)"
                    />
                    <span>{{ category.category }}</span>
                  </div>
                  <span>({{ category.count }})</span>
                </label>
              </div>
            </div>
          </UiSheetContent>
        </UiSheet>

        <div class="relative w-full items-center">
          <UiInput
            v-model="search"
            id="search"
            type="text"
            placeholder="Search..."
            class="pl-12.5 rounded-3xl bg-secondary"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-4"
          >
            <Search class="size-6" />
          </span>
        </div>
      </div>

      <div
        v-if="isPending"
        class="grid grid-cols-2 gap-y-6 gap-x-2 md:grid-cols-3"
      >
        <UiSkeleton v-for="i in 9" :key="i" class="w-full h-80" />
      </div>

      <div
        v-else-if="filteredProducts.length > 0"
        class="grid grid-cols-2 gap-y-6 gap-x-2 md:grid-cols-3"
      >
        <CardProduct
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
      <p v-else class="text-center mt-5">Product not found.</p>
    </div>
  </section>
</template>

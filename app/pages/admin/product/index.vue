<script setup lang="ts">
import { useCategory } from "~/composables/category/useCategory";
import { useProducts } from "~/composables/product/useProducts";
import type { ProductType } from "~/types/product";
import { filterArray } from "~/lib/constanta";
import { Search, Filter, X } from "lucide-vue-next";

definePageMeta({
  middleware: ["auth", "admin"],
  layout: "admin",
});

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
  <section class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Product Manager</h1>

      <UiButton>
        <NuxtLink to="/admin/product/add">Add Product</NuxtLink>
      </UiButton>
    </div>

    <!-- Search, Filter, and Sort Controls -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <!-- Search Input -->
      <div class="relative flex-1">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
        />
        <UiInput
          v-model="search"
          placeholder="Search products..."
          class="pl-10"
        />
      </div>

      <UiSheet v-model:open="isFilterSheetOpen">
        <UiSheetTrigger as-child>
          <UiButton variant="outline" class="gap-2">
            <Filter class="w-4 h-4" />
            Filter
            <UiBadge
              v-if="selectedCategories.length > 0"
              variant="secondary"
              class="ml-1"
            >
              {{ selectedCategories.length }}
            </UiBadge>
          </UiButton>
        </UiSheetTrigger>
        <UiSheetContent>
          <UiSheetHeader>
            <UiSheetTitle class="text-3xl">Filter by Category</UiSheetTitle>
            <UiSheetDescription>
              Select categories to filter products
            </UiSheetDescription>
          </UiSheetHeader>
          <div class="mt-2 space-y-4 mx-4">
            <div class="flex justify-between">
              <h2 class="text-2xl">Categories List</h2>
              <AdminProductCategoryDialog>
                <UiButton size="sm" class="w-full">
                  + Add New Category
                </UiButton>
              </AdminProductCategoryDialog>
            </div>
            <div v-if="isCategoriesPending" class="space-y-2">
              <UiSkeleton v-for="i in 5" :key="i" class="w-full h-10" />
            </div>
            <div
              v-else-if="categories && categories.length > 0"
              class="space-y-2"
            >
              <div
                v-for="category in categories"
                :key="category.category"
                class="flex items-center space-x-2"
              >
                <UiCheckbox
                  :id="category.category"
                  :checked="selectedCategories.includes(category.category)"
                  @update:checked="() => toggleCategory(category.category)"
                />
                <label
                  :for="category.category"
                  class="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {{ category.category }}
                </label>
              </div>
            </div>
            <p v-else class="text-lg text-muted-foreground">
              No categories available
            </p>
          </div>
          <UiSheetFooter class="mt-6">
            <UiButton
              v-if="selectedCategories.length > 0"
              variant="outline"
              @click="selectedCategories = []"
              class="w-full"
            >
              Clear All
            </UiButton>
          </UiSheetFooter>
        </UiSheetContent>
      </UiSheet>

      <!-- Sort Dropdown -->
      <UiSelect v-model="sortBy">
        <UiSelectTrigger class="border border-border cursor-pointer">
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

    <!-- Active Filters Display -->
    <div
      v-if="search || selectedCategories.length > 0 || sortBy"
      class="flex flex-wrap gap-2 mb-4"
    >
      <UiBadge v-if="search" variant="secondary" class="gap-1">
        Search: "{{ search }}"
        <button @click="search = ''" class="ml-1 hover:text-destructive">
          <X class="w-3 h-3" />
        </button>
      </UiBadge>
      <UiBadge
        v-for="cat in selectedCategories"
        :key="cat"
        variant="secondary"
        class="gap-1"
      >
        {{ cat }}
        <button
          @click="toggleCategory(cat)"
          class="ml-1 hover:text-destructive"
        >
          <X class="w-3 h-3" />
        </button>
      </UiBadge>
      <UiBadge v-if="sortBy" variant="secondary" class="gap-1">
        Sort: {{ sortBy }}
        <button @click="sortBy = ''" class="ml-1 hover:text-destructive">
          <X class="w-3 h-3" />
        </button>
      </UiBadge>
    </div>

    <!-- Product Grid -->
    <div
      v-if="isPending"
      class="grid grid-cols-2 gap-y-6 gap-x-2 md:grid-cols-5"
    >
      <UiSkeleton v-for="i in 9" :key="i" class="w-full h-80" />
    </div>

    <div
      v-else-if="filteredProducts.length > 0"
      class="grid grid-cols-2 gap-y-6 gap-x-2 md:grid-cols-4 md:gap-x-8"
    >
      <AdminProductCardProduct
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    <div v-else class="text-center mt-12 p-8">
      <Icon
        name="lucide:search-x"
        class="w-16 h-16 mx-auto text-muted-foreground mb-4"
      />
      <p class="text-lg font-semibold mb-2">No products found</p>
      <p class="text-sm text-muted-foreground mb-4">
        Try adjusting your search or filter criteria
      </p>
      <UiButton
        variant="outline"
        @click="
          () => {
            search = '';
            selectedCategories = [];
            sortBy = '';
          }
        "
      >
        Clear all filters
      </UiButton>
    </div>
  </section>
</template>

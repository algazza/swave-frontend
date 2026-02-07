<script setup lang="ts">
import { ChevronLeft, CircleUserRound, Pen, Search } from "lucide-vue-next";
import { useHistory } from "~/composables/checkout/useHistory";

definePageMeta({
  layout: "account",
  middleware: "auth",
});

const { data: history, isLoading, isError, error } = useHistory();
if (!isError) {
  throw error;
}

const data = ref(history);
const status = ref("");
const searching = ref("");

const filteredData = computed(() => {
  let filtered = data.value;

  if (status.value && status.value !== "all") {
    filtered = filtered?.filter(
      (item) => item.status.toLowerCase() === status.value.toLowerCase()
    );
  }

  if (searching.value) {
    filtered = filtered?.filter((item) =>
      item.products.some((product) =>
        product.name.toLowerCase().includes(searching.value.toLowerCase())
      )
    );
  }

  return filtered;
});
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex gap-3 items-center mb-5">
      <NuxtLink to="/account" class="lg:hidden">
        <ChevronLeft />
      </NuxtLink>
      <h2 class="text-3xl">Transaction</h2>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
      <div class="w-full relative items-center">
        <UiInput
          id="search"
          type="text"
          placeholder="Search Product"
          class="pl-12.5 rounded-3xl bg-secondary"
          v-model="searching"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-4"
        >
          <Search class="size-6" />
        </span>
      </div>

      <UiSelect v-model="status">
        <UiSelectTrigger
          class="min-w-40 border border-foreground max-md:w-full"
        >
          <UiSelectValue placeholder="Status" class="font-semibold" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectItem
              class="font-semibold"
              value="all"
              >All</UiSelectItem
            >
            <UiSelectItem
              class="font-semibold focus:text-success-purple text-success-purple"
              value="pending"
              >Pending</UiSelectItem
            >
            <UiSelectItem
              class="font-semibold focus:text-accent text-accent"
              value="processing"
              >Processing</UiSelectItem
            >
            <UiSelectItem
              class="font-semibold focus:text-success-blue text-success-blue"
              value="delivery"
              >Delivery</UiSelectItem
            >
            <UiSelectItem
              class="font-semibold focus:text-success-green text-success-green"
              value="success"
              >Success</UiSelectItem
            >
            <UiSelectItem
              class="font-semibold focus:text-destructive text-destructive"
              value="cancel"
              >Cancel</UiSelectItem
            >
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="space-y-6 mt-6" v-if="isLoading">
      <UiSkeleton class="w-full h-49" />
      <UiSkeleton class="w-full h-49" />
      <UiSkeleton class="w-full h-49" />
    </div>

    <div class="grid mt-6">
      <AccountTransactionHistoryCard
        v-for="item in filteredData"
        :key="item.id"
        :data="item"
        class="mt-4"
      />
    </div>

    <p
      class="text-center text-sm text-muted-foreground"
      v-if="!isLoading && filteredData?.length === 0"
    >
      No transaction history found.
    </p>
  </div>
</template>

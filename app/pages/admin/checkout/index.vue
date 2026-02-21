<script setup lang="ts">
import { checkoutData } from "~/lib/data";
import { columns } from "./column";
import { useHistoryAdmin } from "~/composables/checkout/admin/useHistoryAdmin";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const { data: checkoutHistory, isPending } = useHistoryAdmin();
</script>

<template>
  <section class="p-6">
    <h1 class="text-2xl">Order History</h1>
    <UiSkeleton v-if="isPending" class="w-full mt-4" :count="5" />
    <AdminDataTable v-else-if="checkoutHistory" :columns="columns" :data="checkoutHistory" />
  </section>
</template>

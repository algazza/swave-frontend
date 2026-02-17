<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "admin"],
  layout: "admin",
});
</script>

<template>
  <section class="p-6">
    <div class="flex justify-between">
      <h1 class="text-2xl">Product Manager</h1>

      <UiButton>
        <NuxtLink to="/admin/product/add">Add Product</NuxtLink>
      </UiButton>
    </div>
  </section>
</template>

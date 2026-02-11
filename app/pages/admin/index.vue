<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
})
</script>

<template>
  <section>
      <div class="flex flex-1 flex-col">
        <div class="@container/main flex flex-1 flex-col gap-2">
          <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <AdminSectionCard />
            <div class="px-4 lg:px-6">
              <AdminChart />
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

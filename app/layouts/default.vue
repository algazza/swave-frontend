<script setup lang="ts"></script>

<template>
  <div class="">
    <AppHeader />

    <main
      class="overflow-hidden mt-20 relative px-4 md:px-10 lg:px-20 grid justify-center"
    >
      <div class="max-w-[1200px]">
        <slot />
    </div>
    </main>

    <AppFooter />
  </div>
</template>

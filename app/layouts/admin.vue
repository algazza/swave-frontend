<script setup lang="ts">
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
</script>

<template>
  <SidebarProvider
    :style="{
      '--sidebar-width': 'calc(var(--spacing) * 72)',
      '--header-height': 'calc(var(--spacing) * 12)',
    }"
  >
    <AdminSidebar />
    <SidebarInset>
      <main class="overflow-hidden">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

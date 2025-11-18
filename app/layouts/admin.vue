<script setup lang="ts">
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
</script>

<template>
  <SidebarProvider
  
  >
    <AdminSidebar />
    <SidebarInset>
      <main class="overflow-hidden">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

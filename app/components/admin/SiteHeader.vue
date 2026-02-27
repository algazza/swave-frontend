<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserStar } from "lucide-vue-next";

const route = useRoute();

const lastPath = computed(() => {
  const parts = route.path.split("/").filter(Boolean);
  return parts.at(-1) || "";
});
</script>

<template>
  <header
    class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
  >
    <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
      <SidebarTrigger class="-ml-1" />
      <Separator
        orientation="vertical"
        class="mx-2 data-[orientation=vertical]:h-4"
      />
      <h1 class="text-lg font-medium capitalize">
        {{ lastPath === "admin" ? "dashboard" : lastPath }}
      </h1>
      <div class="ml-auto flex gap-6">
        <div class="flex items-center gap-2">
          <UserStar />
          <p>Admin</p>
        </div>
        <UiButton variant="outline" size="sm">
          <NuxtLink to="/">View Site</NuxtLink>
        </UiButton>
      </div>
    </div>
  </header>
</template>

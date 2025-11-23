<script setup lang="ts">
import { adminNavLink } from "~/lib/constanta";
</script>

<template>
  <UiSidebar variant="inset">
    <UiSidebarContent>
      <UiSidebarGroup>
        <UiSidebarGroupLabel>Admin Dashboard</UiSidebarGroupLabel>
        <UiSidebarGroupContent>
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="item in adminNavLink" :key="item.title">
              <UiSidebarMenuButton as-child>
                <NuxtLink :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroupContent>
      </UiSidebarGroup>
    </UiSidebarContent>
  </UiSidebar>
</template>

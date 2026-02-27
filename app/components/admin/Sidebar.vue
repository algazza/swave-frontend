<script setup lang="ts">
import { LogOut } from "lucide-vue-next";
import { useLogout } from "~/composables/auth/useLogout";
import { adminNavLink } from "~/lib/constanta";

const logout = useLogout();
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
                <NuxtLink :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroupContent>
      </UiSidebarGroup>
    </UiSidebarContent>
    <UiSidebarFooter>
      <AppAlertDialog
        service="Logout"
        title="Are you sure you want to logout?"
        description="You will be logged out from your account."
        :fnSubmit="logout"
      >
      <UiButton variant="destructive" class="w-full font-semibold cursor-pointer">
          <LogOut/>
          Logout
        </UiButton>
      </AppAlertDialog>
    </UiSidebarFooter>
  </UiSidebar>
</template>

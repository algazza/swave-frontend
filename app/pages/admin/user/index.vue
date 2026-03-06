<script setup lang="ts">
import { columns } from "./column";
import { useAllUsers } from "~/composables/user/useAllUsers";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const { data: users, isPending } = useAllUsers();
</script>

<template>
  <section class="p-6">
    <h1 class="text-2xl">User Management</h1>
    <UiSkeleton v-if="isPending" class="w-full mt-4" :count="5" />
    <AdminUserDataTable
      v-else-if="users && users.length > 0"
      :columns="columns"
      :data="users"
    />
  </section>
</template>

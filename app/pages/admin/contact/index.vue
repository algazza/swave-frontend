<script setup lang="ts">
import { Eye } from "lucide-vue-next";
import { useContacts } from "~/composables/contact/useContacts";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const { data: contacts, isLoading, isError, error } = useContacts();
</script>

<template>
  <section class="p-6 space-y-4">
    <div>
      <h1 class="text-2xl font-semibold">Contact Management</h1>
      <p class="text-sm text-muted-foreground">
        View incoming contact messages from users.
      </p>
    </div>

    <template v-if="isLoading">
      <UiSkeleton class="h-12 w-full" />
      <UiSkeleton class="h-52 w-full" />
    </template>

    <template v-else-if="isError">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Failed to load contacts</UiCardTitle>
          <UiCardDescription>
            {{ error?.message || "Please refresh and try again." }}
          </UiCardDescription>
        </UiCardHeader>
      </UiCard>
    </template>

    <template v-else>
      <UiCard>
        <UiCardContent class="pt-6">
          <div class="overflow-x-auto rounded-md border">
            <UiTable>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead class="w-20">ID</UiTableHead>
                  <UiTableHead>Name</UiTableHead>
                  <UiTableHead>Email</UiTableHead>
                  <UiTableHead>Topic</UiTableHead>
                  <UiTableHead class="text-right">Action</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="contact in contacts || []" :key="contact.id">
                  <UiTableCell class="font-medium">{{
                    contact.id
                  }}</UiTableCell>
                  <UiTableCell>{{ contact.name }}</UiTableCell>
                  <UiTableCell>{{ contact.email }}</UiTableCell>
                  <UiTableCell>{{ contact.topic }}</UiTableCell>
                  <UiTableCell class="text-right">
                    <NuxtLink :to="`/admin/contact/${contact.id}`">
                      <UiButton size="sm" variant="outline" class="gap-2">
                        <Eye class="size-4" />
                        Detail
                      </UiButton>
                    </NuxtLink>
                  </UiTableCell>
                </UiTableRow>
                <UiTableRow v-if="!(contacts && contacts.length)">
                  <UiTableCell
                    colspan="5"
                    class="h-20 text-center text-muted-foreground"
                  >
                    No contact messages available.
                  </UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </div>
        </UiCardContent>
      </UiCard>
    </template>
  </section>
</template>

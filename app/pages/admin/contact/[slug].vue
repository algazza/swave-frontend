<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";
import { useDetailContact } from "~/composables/contact/useDetailContact";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const route = useRoute();
const router = useRouter();

const contactId = computed(() => {
  const parsed = Number(route.params.slug);
  return Number.isFinite(parsed) ? parsed : 0;
});

const { data, isLoading, isError, error } = useDetailContact(contactId);
</script>

<template>
  <section class="p-6 space-y-6">
    <div class="flex items-center gap-2">
      <button @click="router.back()" class="cursor-pointer">
        <ChevronLeft class="size-8" />
      </button>
      <h1 class="text-2xl font-semibold">Contact Detail</h1>
    </div>

    <template v-if="isLoading">
      <UiSkeleton class="h-24 w-full" />
      <UiSkeleton class="h-48 w-full" />
    </template>

    <template v-else-if="isError">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Failed to load contact detail</UiCardTitle>
          <UiCardDescription>
            {{ error?.message || "Please refresh and try again." }}
          </UiCardDescription>
        </UiCardHeader>
      </UiCard>
    </template>

    <template v-else-if="data">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>{{ data.topic }}</UiCardTitle>
          <UiCardDescription>
            Message from {{ data.name }} ({{ data.email }})
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border p-3">
              <p class="text-sm text-muted-foreground">Name</p>
              <p class="font-medium">{{ data.name }}</p>
            </div>
            <div class="rounded-lg border p-3">
              <p class="text-sm text-muted-foreground">Email</p>
              <p class="font-medium">{{ data.email }}</p>
            </div>
          </div>

          <div class="rounded-lg border p-4">
            <p class="text-sm text-muted-foreground mb-2">Description</p>
            <p class="whitespace-pre-line leading-relaxed">
              {{ data.description }}
            </p>
          </div>
        </UiCardContent>
      </UiCard>
    </template>

    <template v-else>
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Contact not found</UiCardTitle>
        </UiCardHeader>
      </UiCard>
    </template>
  </section>
</template>

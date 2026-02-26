<script setup lang="ts">
import {
  Building2,
  ChevronLeft,
  Home,
  Hotel,
  MapPin,
  School,
} from "lucide-vue-next";
import { useDetailUser } from "~/composables/user/useDetailUser";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const route = useRoute();
const router = useRouter();
const paramSlug = computed(() => route.params.slug as string);

const { data, isLoading, error, isError } = useDetailUser(paramSlug);

const statusLabel = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1);

const statusClass = (status: string) =>
  status === "pending"
    ? "text-success-purple"
    : status === "processing"
      ? "text-accent"
      : status === "delivery"
        ? "text-success-blue"
        : status === "success"
          ? "text-success-green"
          : "text-destructive";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const iconByAddressLabel = (label: string) =>
  label === "Home"
    ? Home
    : label === "Office"
      ? Building2
      : label === "Apartment"
        ? Hotel
        : School;

const orderTotalItem = (
  order: NonNullable<typeof data.value>["checkout"][number],
) => order.products.reduce((sum, item) => sum + item.quantity, 0);

const orderTotalPrice = (
  order: NonNullable<typeof data.value>["checkout"][number],
) => order.products.reduce((sum, item) => sum + item.total_price, 0);
</script>

<template>
  <section class="p-6 space-y-6">
    <div class="flex items-center gap-2">
      <button @click="router.back()">
        <ChevronLeft class="size-8" />
      </button>
      <h1 class="text-2xl font-semibold">User Detail</h1>
    </div>

    <template v-if="isLoading">
      <UiSkeleton class="h-32 w-full" />
      <UiSkeleton class="h-52 w-full" />
      <UiSkeleton class="h-80 w-full" />
    </template>

    <template v-else-if="isError">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle class="text-2xl">Failed to load user detail</UiCardTitle>
          <UiCardDescription>
            {{ error?.message || "Please refresh and try again." }}
          </UiCardDescription>
        </UiCardHeader>
      </UiCard>
    </template>

    <template v-else-if="data">
      <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <UiCard class="xl:col-span-1">
          <UiCardHeader>
            <UiCardTitle class="text-2xl">{{ data.name }}</UiCardTitle>
            <UiCardDescription>@{{ data.username }}</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <p class="text-sm text-muted-foreground">Phone: {{ data.phone }}</p>
            <div class="flex flex-wrap gap-2">
              <UiBadge variant="outline"
                >Address: {{ data.address?.length || 0 }}</UiBadge
              >
              <UiBadge variant="outline"
                >Checkout: {{ data.checkout.length }}</UiBadge
              >
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard class="xl:col-span-2">
          <UiCardHeader>
            <UiCardTitle class="text-2xl">Address List</UiCardTitle>
            <UiCardDescription>Saved customer addresses</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-3">
            <div
              v-for="address in data.address || []"
              :key="address.id"
              class="border-2 rounded-xl p-4 w-full flex justify-between items-center"
            >
              <div class="space-y-1">
                <div class="flex gap-2">
                  <div
                    class="bg-secondary flex gap-2 justify-center items-center p-1 rounded-lg font-semibold"
                  >
                    <component
                      :is="iconByAddressLabel(address.label)"
                      class="size-4"
                    />
                    <span class="text-sm">{{ address.label }}</span>
                  </div>
                  <div
                    v-if="address.main_address"
                    class="flex gap-2 justify-center items-center p-1 rounded-lg font-semibold border border-foreground"
                  >
                    <MapPin class="size-4" />
                    <span class="text-sm">Main Address</span>
                  </div>
                </div>
                <p class="font-semibold">{{ address.recipient }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ address.address }}, {{ address.subdistrict }},
                  {{ address.city }},
                  {{ address.zip_code }}
                </p>
              </div>
            </div>
            <p
              v-if="!(data.address && data.address.length)"
              class="text-sm text-muted-foreground"
            >
              No address available.
            </p>
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle class="text-2xl">User Activity</UiCardTitle>
          <UiCardDescription>
            Checkout history and order activity
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="space-y-5">
          <div
            v-for="order in data.checkout"
            :key="order.order_id"
            class="rounded-xl border-2 border-secondary p-4 space-y-4"
          >
            <div
              class="flex flex-col gap-2 md:flex-row md:justify-between md:items-center"
            >
              <div>
                <p class="font-semibold">{{ order.order_id }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ formatDateTime(order.created_at) }}
                </p>
              </div>
              <div class="flex gap-2 items-center">
                <UiBadge variant="outline" :class="statusClass(order.status)">
                  {{ statusLabel(order.status) }}
                </UiBadge>
                <NuxtLink :to="`/admin/checkout/${order.order_id}`">
                  <UiButton size="sm">View Checkout Detail</UiButton>
                </NuxtLink>
              </div>
            </div>

            <div class="grid gap-3">
              <div
                v-for="product in order.products"
                :key="`${order.order_id}-${product.id}-${product.variant}`"
                class="grid gap-3"
              >
                <div class="flex gap-5">
                  <div class="size-20 aspect-square overflow-hidden">
                    <NuxtImg
                      :src="product.image_path"
                      :alt="product.name"
                      class="w-full h-full object-cover object-center outline-hidden"
                    />
                  </div>

                  <div class="w-full flex justify-between items-end">
                    <div class="grid">
                      <div class="p-1 bg-secondary w-fit">
                        {{ product.category }}
                        {{
                          product.variant !== product.category
                            ? `, ${product.variant}`
                            : ""
                        }}
                      </div>
                      <h2 class="text-xl mt-2 mb-1">{{ product.name }}</h2>
                      <p>
                        Rp{{ product.variant_price.toLocaleString("id-ID") }}
                      </p>
                    </div>
                    <span class="text-xs">Qty: {{ product.quantity }}</span>
                  </div>
                </div>

                <div class="content-[''] h-px w-full bg-foreground" />

                <div class="flex justify-between items-center">
                  <span>Item Total:</span>
                  <span class="font-bold"
                    >Rp{{ product.total_price.toLocaleString("id-ID") }}</span
                  >
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between text-sm md:text-base">
              <span>Total Item: {{ orderTotalItem(order) }}</span>
              <span class="font-bold"
                >Order Total: Rp{{
                  orderTotalPrice(order).toLocaleString("id-ID")
                }}</span
              >
            </div>
          </div>

          <p v-if="!data.checkout.length" class="text-sm text-muted-foreground">
            No checkout activity found.
          </p>
        </UiCardContent>
      </UiCard>
    </template>

    <template v-else>
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>User not found</UiCardTitle>
        </UiCardHeader>
      </UiCard>
    </template>
  </section>
</template>

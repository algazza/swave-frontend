<script setup lang="ts">
import { useOverview } from "~/composables/dashboard/useOverview";
import { formatRupiah, isLocalImagePath } from "~/lib/utils";

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
})

const API_URL = useRuntimeConfig().public.API_URL;

const { data: overviewData, isLoading, isError, error } = useOverview();

const summary = computed(() => overviewData.value?.summary);
const orderStatusBreakdown = computed(() => overviewData.value?.order_status_breakdown ?? []);
const chartData = computed(() =>
  (overviewData.value?.sales_trend ?? []).map((item) => ({
    date: new Date(item.date),
    checkout: item.checkout,
  }))
);
const topProducts = computed(() => overviewData.value?.top_products ?? []);
const lowStockVariants = computed(() => overviewData.value?.low_stock_variants ?? []);
const recentOrders = computed(() => overviewData.value?.recent_orders ?? []);

const formatCurrency = (value: number) => `Rp${formatRupiah(value)}`;
const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
const statusLabel = (status: string) =>
  status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
const imageUrl = (imagePath: string) =>
  isLocalImagePath(imagePath) ? `${API_URL}/${imagePath}` : imagePath;
</script>

<template>
  <section>
    <div class="flex flex-1 flex-col">
      <div class="@container/main flex flex-1 flex-col gap-2">
        <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <template v-if="isLoading">
            <div class="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-4">
              <UiSkeleton v-for="index in 4" :key="index" class="h-28 w-full" />
            </div>
            <div class="px-4 lg:px-6">
              <UiSkeleton class="h-[320px] w-full" />
            </div>
          </template>

          <template v-else-if="isError">
            <div class="px-4 lg:px-6">
              <UiCard>
                <UiCardHeader>
                  <UiCardTitle>Failed to load dashboard</UiCardTitle>
                  <UiCardDescription>
                    {{ error?.message || 'Please refresh this page and try again.' }}
                  </UiCardDescription>
                </UiCardHeader>
              </UiCard>
            </div>
          </template>

          <template v-else>
            <AdminSectionCard
              :summary="summary"
              :order-status-breakdown="orderStatusBreakdown"
            />

            <div class="px-4 lg:px-6">
              <AdminChart :chart-data="chartData" />
            </div>

            <div class="grid grid-cols-1 gap-4 px-4 lg:px-6 xl:grid-cols-2">
              <UiCard>
                <UiCardHeader>
                  <UiCardTitle>Top Products</UiCardTitle>
                  <UiCardDescription>Products with highest sold quantity</UiCardDescription>
                </UiCardHeader>
                <UiCardContent class="space-y-4">
                  <div
                    v-for="product in topProducts"
                    :key="product.id"
                    class="flex items-center justify-between gap-3"
                  >
                    <div class="flex items-center gap-3">
                      <img
                        :src="imageUrl(product.image_path)"
                        :alt="product.name"
                        class="h-12 w-12 rounded-md object-cover"
                      >
                      <div>
                        <p class="font-medium">{{ product.name }}</p>
                        <p class="text-sm text-muted-foreground">{{ product.category }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold">{{ product.sold_quantity }} sold</p>
                      <p class="text-sm text-muted-foreground">{{ formatCurrency(product.revenue) }}</p>
                    </div>
                  </div>
                  <p v-if="!topProducts.length" class="text-sm text-muted-foreground">No top products available.</p>
                </UiCardContent>
              </UiCard>

              <UiCard>
                <UiCardHeader>
                  <UiCardTitle>Low Stock Variants</UiCardTitle>
                  <UiCardDescription>Variants that need restock soon</UiCardDescription>
                </UiCardHeader>
                <UiCardContent class="space-y-3">
                  <div
                    v-for="variant in lowStockVariants"
                    :key="variant.id"
                    class="flex items-center justify-between rounded-md border p-3"
                  >
                    <div>
                      <p class="font-medium">{{ variant.product_name }} - {{ variant.variant }}</p>
                      <p class="text-sm text-muted-foreground">{{ formatCurrency(variant.price) }}</p>
                    </div>
                    <UiBadge variant="outline">Stock: {{ variant.stock }}</UiBadge>
                  </div>
                  <p v-if="!lowStockVariants.length" class="text-sm text-muted-foreground">No low stock variants.</p>
                </UiCardContent>
              </UiCard>
            </div>

            <div class="px-4 lg:px-6">
              <UiCard>
                <UiCardHeader>
                  <UiCardTitle>Recent Orders</UiCardTitle>
                  <UiCardDescription>Latest transactions from customers</UiCardDescription>
                </UiCardHeader>
                <UiCardContent>
                  <div class="overflow-x-auto rounded-md border">
                    <UiTable>
                      <UiTableHeader>
                        <UiTableRow>
                          <UiTableHead>Order ID</UiTableHead>
                          <UiTableHead>Customer</UiTableHead>
                          <UiTableHead>Date</UiTableHead>
                          <UiTableHead>Delivery</UiTableHead>
                          <UiTableHead>Status</UiTableHead>
                          <UiTableHead class="text-right">Total</UiTableHead>
                        </UiTableRow>
                      </UiTableHeader>
                      <UiTableBody>
                        <UiTableRow v-for="order in recentOrders" :key="order.order_id">
                          <UiTableCell class="font-medium">{{ order.order_id }}</UiTableCell>
                          <UiTableCell>
                            <p>{{ order.customer_name }}</p>
                            <p class="text-xs text-muted-foreground">@{{ order.customer_username }}</p>
                          </UiTableCell>
                          <UiTableCell>{{ formatDateTime(order.created_at) }}</UiTableCell>
                          <UiTableCell>{{ statusLabel(order.delivery_type) }}</UiTableCell>
                          <UiTableCell>
                            <UiBadge variant="outline">{{ statusLabel(order.order_status) }}</UiBadge>
                          </UiTableCell>
                          <UiTableCell class="text-right">{{ formatCurrency(order.total_price) }}</UiTableCell>
                        </UiTableRow>
                        <UiTableRow v-if="!recentOrders.length">
                          <UiTableCell colspan="7" class="h-20 text-center text-muted-foreground">
                            No recent orders.
                          </UiTableCell>
                        </UiTableRow>
                      </UiTableBody>
                    </UiTable>
                  </div>
                </UiCardContent>
              </UiCard>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

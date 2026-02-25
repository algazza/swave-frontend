<script setup lang="ts">
import type {
  DashboardOrderStatus,
  DashboardSummary,
} from "~/composables/dashboard/useOverview";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const props = defineProps<{
  summary?: DashboardSummary;
  orderStatusBreakdown?: DashboardOrderStatus[];
}>();

const summaryItems = computed(() => {
  if (!props.summary) return [];

  return [
    {
      label: "Total Revenue",
      value: `Rp${props.summary.total_revenue.toLocaleString("id-ID")}`,
    },
    {
      label: "Total Orders",
      value: props.summary.total_order.toLocaleString("id-ID"),
    },
    {
      label: "Pending Orders",
      value: props.summary.pending_order.toLocaleString("id-ID"),
    },
    {
      label: "Completed Orders",
      value: props.summary.completed_order.toLocaleString("id-ID"),
    },
    {
      label: "Total Customers",
      value: props.summary.total_customer.toLocaleString("id-ID"),
    },
    {
      label: "Total Products",
      value: props.summary.total_product.toLocaleString("id-ID"),
    },
    {
      label: "Low Stock",
      value: props.summary.low_stock_count.toLocaleString("id-ID"),
    },
  ];
});

const statusLabel = (status: string) =>
  status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
</script>

<template>
  <div
    class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
  >
    <Card
      v-for="item in summaryItems"
      :key="item.label"
      class="@container/card"
    >
      <CardHeader>
        <CardDescription>{{ item.label }}</CardDescription>
        <CardTitle
          class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
        >
          {{ item.value }}
        </CardTitle>
      </CardHeader>
      <CardContent
        v-if="item.label === 'Total Orders' && orderStatusBreakdown?.length"
        class="pt-0"
      >
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="status in orderStatusBreakdown"
            :key="status.status"
            variant="outline"
          >
            {{ statusLabel(status.status) }}: {{ status.count }}
          </Badge>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

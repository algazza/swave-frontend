<script setup lang="ts">
type ChartDataType = {
  date: Date;
  checkout: number;
};
const props = defineProps<{
  chartData: ChartDataType[];
}>();
import type { ChartConfig } from "@/components/ui/chart";

// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue";

import {
  ChartContainer,
  ChartCrosshair,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Data = ChartDataType;

const chartConfig = {
  checkout: {
    label: "checkout",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const svgDefs = `
  <linearGradient id="fillCheckout" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stop-color="var(--primary)" stop-opacity="0.8" />
    <stop offset="95%" stop-color="var(--primary)" stop-opacity="0.1" />
  </linearGradient>
`;

const timeRange = ref("30d");
const maxCheckoutValue = computed(() => {
  const highest = props.chartData.reduce(
    (max, item) => Math.max(max, item.checkout),
    0,
  );
  return highest > 0 ? highest + Math.ceil(highest * 0.2) : 10;
});

const referenceDate = computed(() => {
  if (!props.chartData.length) return new Date();
  return new Date(
    Math.max(...props.chartData.map((item) => item.date.getTime())),
  );
});

const filterRange = computed(() => {
  return props.chartData.filter((item) => {
    const date = new Date(item.date);
    let daysToSubtract = 30;
    if (timeRange.value === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate.value);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });
});
</script>

<template>
  <Card class="pt-0">
    <CardHeader
      class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row"
    >
      <div class="grid flex-1 gap-1">
        <CardTitle>Sales Trend</CardTitle>
        <CardDescription> Showing checkout totals by day </CardDescription>
      </div>
      <Select v-model="timeRange">
        <SelectTrigger
          class="hidden w-40 rounded-lg sm:ml-auto sm:flex"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Last 30 days" />
        </SelectTrigger>
        <SelectContent class="rounded-xl">
          <SelectItem value="30d" class="rounded-lg"> Last 30 days </SelectItem>
          <SelectItem value="7d" class="rounded-lg"> Last 7 days </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent class="px-2 pt-4 sm:px-6 sm:pt-6 pb-4">
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-62.5 w-full"
        :cursor="false"
      >
        <VisXYContainer
          :data="filterRange"
          :svg-defs="svgDefs"
          :margin="{ left: -40 }"
          :y-domain="[0, maxCheckoutValue]"
        >
          <VisArea
            :x="(d: Data) => d.date"
            :y="[(d: Data) => d.checkout]"
            :color="() => ['url(#fillCheckout)']"
            :opacity="0.6"
          />

          <VisLine
            :x="(d: Data) => d.date"
            :y="[(d: Data) => d.checkout]"
            :color="() => [chartConfig.checkout.color]"
            :line-width="1"
          />
          <VisAxis
            type="x"
            :x="(d: Data) => d.date"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="6"
            :tick-format="
              (d: number, index: number) => {
                const date = new Date(d);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }
            "
          />
          <VisAxis
            type="y"
            :num-ticks="3"
            :tick-line="false"
            :domain-line="false"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="
              componentToString(chartConfig, ChartTooltipContent, {
                labelFormatter: (d) => {
                  return new Date(d).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                },
              })
            "
            :color="() => [chartConfig.checkout.color]"
          />
        </VisXYContainer>

        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
  </Card>
</template>

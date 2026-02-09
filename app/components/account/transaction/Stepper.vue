<script setup lang="ts">
import { Package, PackageOpen, ReceiptText, Truck, X } from "lucide-vue-next";
import { formatDate } from "~/lib/utils";

type StatusItem = {
  order_status: string;
  description: string | null;
  created_at: string;
};

const props = withDefaults(defineProps<{ statusData: StatusItem[] }>(), {
  statusData: () => [],
});
const device = useDevice();

const statusStepMap = {
  pending: { step: 1, title: "Order Placed", icon: ReceiptText },
  processing: { step: 2, title: "Order Processed", icon: Package },
  delivery: { step: 3, title: "Order Shipped", icon: Truck },
  success: { step: 4, title: "Order Received", icon: PackageOpen },
  cancel: { step: 5, title: "Order Cancelled", icon: X },
};

const processOrderStatus = (
  statusResponse: Array<{
    order_status: string;
    description: string | null;
    created_at: string;
  }>,
) => {
  const hasCancellation = statusResponse.some(
    (s) => s.order_status === "cancel",
  );

  if (hasCancellation) {
    const result = [];
    for (const status of statusResponse) {
      const statusKey = status.order_status as keyof typeof statusStepMap;
      const stepConfig = statusStepMap[statusKey];

      if (stepConfig) {
        result.push({
          step: statusKey === "cancel" ? 4 : stepConfig.step, // Treat cancel as step 4
          title: stepConfig.title,
          description: status.description || status.created_at,
          icon: stepConfig.icon,
        });
      }

      // Stop adding steps after cancel
      if (status.order_status === "cancel") {
        break;
      }
    }
    return result;
  } else {
    const allSteps = ["pending", "processing", "delivery", "success"];

    return allSteps.map((statusKey) => {
      const stepConfig = statusStepMap[statusKey as keyof typeof statusStepMap];
      const statusData = statusResponse.find(
        (s) => s.order_status === statusKey,
      );

      return {
        step: stepConfig.step,
        title: stepConfig.title,
        description: statusData ? formatDate(statusData.created_at) : "???",
        icon: stepConfig.icon,
      };
    });
  }
};

const processedSteps = computed(() => {
  if (!props.statusData || props.statusData.length === 0) {
    return [];
  }
  return processOrderStatus(props.statusData);
});

const step = computed(() => {
  return props.statusData.length;
});
</script>

<template>
  <UiStepper
    class="flex flex-col md:flex-row items-start gap-6 md:gap-2 py-6 max-md:mx-auto max-md:justify-start"
    :model-value="step"
  >
    <UiStepperItem
      v-for="item in processedSteps"
      :key="item.step"
      :step="item.step"
      class="relative flex w-full items-center gap-6 md:flex-col md:justify-center"
      disabled
    >
      <UiStepperTrigger>
        <UiStepperIndicator class="bg-secondary size-12 md:size-16">
          <template v-if="item.icon">
            <component :is="item.icon" class="size-8 md:size-10" />
          </template>
        </UiStepperIndicator>
      </UiStepperTrigger>

      <UiStepperSeparator
        v-if="item.step !== processedSteps[processedSteps.length - 1]?.step"
        class="absolute left-7 top-13.5 h-[50%] max-md:w-0.5 md:left-[calc(50%+64px)] right-[calc(-50%+64px)] md:top-12 block md:h-0.5 shrink-0 rounded-full"
      />

      <div class="flex flex-col items-start md:items-center">
        <UiStepperTitle class="text-xl md:text-2xl font-quicksand">
          {{ item.title }}
        </UiStepperTitle>
        <UiStepperDescription class="font-medium">
          {{ item.description || "???" }}
        </UiStepperDescription>
      </div>
    </UiStepperItem>
  </UiStepper>
</template>

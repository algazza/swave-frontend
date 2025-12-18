<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import { Copy } from "lucide-vue-next";
import { stepsArray } from "~/lib/data";
import { StatusCheckoutSchema } from "~/types/checkout";
import { toTypedSchema } from "@vee-validate/zod";
import type UpdateStatusVue from "~/components/admin/UpdateStatus.vue";
const schema = toTypedSchema(StatusCheckoutSchema);
const step = ref(2);

const value = ref("delivery");
</script>

<template>
  <section class="p-6">
    <h1 class="text-2xl">Order Detail</h1>

    <div class="flex justify-between">
      <div class="flex items-center gap-3">
        <p class="text-xl font-medium">Order Id: {{ $route.params.id }}</p>
        <Copy class="size-5" />
      </div>

      <AdminUpdateStatus>
        <span
          class="text-3xl capitalize font-semibold"
          :class="
            value === 'pending'
              ? 'text-accent'
              : value === 'packaged'
              ? 'text-success-purple'
              : value === 'delivery'
              ? 'text-success-blue'
              : value === 'success'
              ? 'text-success-green'
              : 'text-destructive'
          "
        >
          delivery
        </span>
      </AdminUpdateStatus>
    </div>

    <UiStepper class="flex w- items-start gap-2 py-6" v-model="step">
      <UiStepperItem
        v-for="item in stepsArray"
        :key="item.step"
        :step="item.step"
        class="relative flex w-full flex-col items-center justify-center"
        disabled
      >
        <UiStepperTrigger>
          <UiStepperIndicator class="bg-secondary size-16">
            <template v-if="item.icon">
              <component :is="item.icon" class="size-10" />
            </template>
          </UiStepperIndicator>
        </UiStepperTrigger>
        <UiStepperSeparator
          v-if="item.step !== stepsArray[stepsArray.length - 1]?.step"
          class="absolute left-[calc(50%+64px)] right-[calc(-50%+64px)] top-12 block h-0.5 shrink-0 rounded-full"
        />
        <div class="flex flex-col items-center">
          <UiStepperTitle class="text-2xl font-quicksand">
            {{ item.title }}
          </UiStepperTitle>
          <UiStepperDescription class="font-medium">
            {{ item.description || "???" }}
          </UiStepperDescription>
        </div>
      </UiStepperItem>
    </UiStepper>
  </section>
</template>

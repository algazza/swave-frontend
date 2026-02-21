<script setup lang="ts">
import {
  Calendar,
  ChevronLeft,
  Clock,
  Copy,
  Home,
  MapPin,
} from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useDetailCheckout } from "~/composables/checkout/useDetailCheckout";
import { copyOrderID, formatRupiah, sumValue } from "~/lib/utils";
import { push } from "notivue";
import { useDetailCheckoutAdmin } from "~/composables/checkout/admin/useDetailCheckoutAdmin";
import { useUpdateStatusCheckout } from "~/composables/checkout/admin/useUpdateStatusCheckout";
import { UpdateStatusCheckoutSchema } from "~/types/checkout";
import type { UpdateStatusCheckoutType } from "~/types/checkout";

definePageMeta({
  middleware: ["auth", "admin"],
  layout: "admin",
});

const router = useRouter();
const route = useRoute();
const paramId = computed(() => route.params.slug as string);
const { data, isLoading, isError, error } = useDetailCheckoutAdmin(paramId);
if (isError.value) {
  throw error;
}

const totalProduct = computed(() =>
  sumValue(data.value?.product_checkout ?? [], (item) => item.quantity),
);

const showUpdateForm = ref<boolean>(false);
const validationSchema = toTypedSchema(UpdateStatusCheckoutSchema);

const currentStatus = computed(
  () => data.value?.status.at(-1)?.order_status || "",
);

const availableStatuses = computed(() => {
  const current = currentStatus.value;

  if (current === "success" || current === "cancel") {
    return [];
  }

  const statusFlow: Record<string, string[]> = {
    pending: ["processing", "cancel"],
    processing: ["delivery", "cancel"],
    delivery: ["success", "cancel"],
  };

  return statusFlow[current] || [];
});

const { mutate: updateStatus, isPending: isUpdating } =
  useUpdateStatusCheckout(paramId);

const onSubmit = (values: any) => {
  const payload: UpdateStatusCheckoutType = {
    order_status: values.order_status,
    ...(values.description && { description: values.description }),
  };

  updateStatus(payload, {
    onSuccess: () => {
      showUpdateForm.value = false;
    },
  });
};

const toggleUpdateForm = () => {
  showUpdateForm.value = !showUpdateForm.value;
};
</script>

<template>
  <section class="pb-20 mx-8">
    <div class="flex gap-2 py-5 items-center justify-start">
      <button @click="router.back()">
        <ChevronLeft class="size-8" />
      </button>
      <h2 class="text-2xl">Checkout History</h2>
    </div>
    <template v-if="isLoading">
      <UiSkeleton class="w-full h-8 md:h-10" />
    </template>

    <div v-else class="md:flex items-center justify-between">
      <div class="flex flex-col gap-1 md:gap-2">
        <div class="flex items-center gap-2 md:text-xl font-medium">
          User: <span class="underline">{{ data?.user.username }}</span>
        </div>
      </div>
      <span
        class="text-xl md:text-2xl lg:text-3xl font-semibold capitalize"
        :class="
          data?.status.at(-1)?.order_status === 'pending'
            ? 'text-success-purple'
            : data?.status.at(-1)?.order_status === 'processing'
              ? 'text-accent'
              : data?.status.at(-1)?.order_status === 'delivery'
                ? 'text-success-blue'
                : data?.status.at(-1)?.order_status === 'success'
                  ? 'text-success-green'
                  : 'text-destructive'
        "
        >{{ data?.status.at(-1)?.order_status }}</span
      >
    </div>

    <section
      v-if="!isLoading && availableStatuses.length > 0"
      class="my-4 p-4 border-2 border-secondary rounded-xl bg-muted/30"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold">Update Order Status</h3>
        <UiButton
          v-if="!showUpdateForm"
          @click="toggleUpdateForm"
          variant="default"
          size="sm"
        >
          Update Status
        </UiButton>
      </div>

      <Form
        v-if="showUpdateForm"
        :validation-schema="validationSchema"
        @submit="onSubmit"
        v-slot="{ meta, values }"
        class="space-y-4 mt-3"
      >
        <Field name="order_status" v-slot="{ field, value }">
          <div class="space-y-2">
            <UiLabel for="order_status"
              >New Status <span class="text-destructive">*</span></UiLabel
            >
            <UiSelect v-bind="field" :model-value="value">
              <UiSelectTrigger class="w-full capitalize">
                <UiSelectValue placeholder="Select Status" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem
                    v-for="status in availableStatuses"
                    :key="status"
                    :value="status"
                    class="capitalize"
                  >
                    {{ status }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
            <ErrorMessage class="text-destructive text-sm" name="order_status" />
          </div>
        </Field>

        <Field v-if="values.order_status === 'cancel'" name="description" v-slot="{ field }">
          <div class="space-y-2">
            <UiLabel for="description">
              Description
              <span
                v-if="values.order_status === 'cancel'"
                class="text-destructive"
                >*</span
              >
              <span v-else class="text-muted-foreground text-sm"
                >(Optional)</span
              >
            </UiLabel>
            <UiTextarea
              v-bind="field"
              id="description"
              :placeholder="
                values.order_status === 'cancel'
                  ? 'Please provide a reason for cancellation'
                  : 'Add optional description'
              "
              class="min-h-20"
            />
            <ErrorMessage class="text-destructive text-sm" name="description" />
          </div>
        </Field>

        <div class="flex gap-2 justify-end">
          <UiButton
            type="button"
            @click="toggleUpdateForm"
            variant="outline"
            :disabled="isUpdating"
          >
            Cancel
          </UiButton>
          <UiButton type="submit" :disabled="!meta.valid || isUpdating">
            {{ isUpdating ? "Updating..." : "Update Status" }}
          </UiButton>
        </div>
      </Form>
    </section>

    <template v-if="isLoading">
      <UiSkeleton class="w-full h-86 md:h-40 my-4" />
    </template>
    <AccountTransactionStepper
      v-else-if="data?.status"
      :statusData="data?.status"
    />

    <div class="flex flex-col gap-5 lg:flex-row">
      <div class="grid gap-5 flex-1 lg:h-fit">
        <section class="space-y-2 p-4 border-2 border-secondary rounded-xl">
          <div class="flex justify-between items-center">
            <span class="text-xl font-semibold md:text-2xl">Address</span>
          </div>
          <template v-if="isLoading">
            <UiSkeleton class="w-full h-30" />
          </template>

          <div v-else-if="data?.delivery.address" class="grid gap-1">
            <p class="text-[16px] font-semibold md:text-xl">
              {{ data?.delivery.address.recipient }}
            </p>
            <p>
              {{ data?.delivery.address.address }},
              {{ data?.delivery.address.subdistrict }},
              {{ data?.delivery.address.city }},
              {{ data?.delivery.address.zip_code }}
            </p>
          </div>
        </section>

        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Product Checkout</p>
          <template v-if="isLoading">
            <UiSkeleton class="w-full h-40" />
          </template>
          <div v-for="check in data?.product_checkout" class="grid gap-3">
            <div class="flex gap-5">
              <div class="size-20 shrink-0 overflow-hidden">
                <NuxtImg
                  :src="check.image_path"
                  :alt="check.name"
                  class="w-full h-full object-cover object-center outline-hidden"
                />
              </div>

              <div class="w-full flex justify-between items-end">
                <div class="grid">
                  <div class="p-1 bg-secondary w-fit">
                    {{ check.category
                    }}{{
                      check.variant !== check.category
                        ? `, ${check.variant}`
                        : ""
                    }}
                  </div>

                  <h2 class="text-xl mt-2 mb-1">{{ check.name }}</h2>
                  <p class="">Rp{{ formatRupiah(check.variant_price) }}</p>
                </div>
                <span class="text-xs">Stok: {{ check.quantity }}</span>
              </div>
            </div>

            <div class="content-[''] h-px w-full bg-foreground" />

            <div class="flex justify-between items-center">
              <span>Total Checkout:</span>
              <span class="font-bold"
                >Rp{{ formatRupiah(check.total_price) }}</span
              >
            </div>
          </div>
        </section>
      </div>

      <div class="grid gap-5 flex-1 lg:h-fit">
        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Delivery</p>
          <template v-if="isLoading">
            <UiSkeleton class="w-full h-10" />
          </template>

          <div
            v-else
            class="border-2 border-foreground text-foreground w-full p-2 rounded-md"
          >
            {{
              data?.delivery.delivery_type === "delivery"
                ? "Delivery"
                : "Pick Up at SMK 8 Semarang"
            }}
          </div>

          <p
            v-if="data?.delivery.delivery_type === 'pickup'"
            class="text-2xl font-semibold"
          >
            Pick Date and Time
          </p>
          <div
            id="gift_card"
            v-if="data?.delivery.delivery_type === 'pickup'"
            class="flex gap-3 w-full items-start"
          >
            <div
              class="w-full flex gap-4 items-center border-2 border-foreground p-2 rounded-md"
            >
              <Calendar class="size-5 text-muted-foreground" />
              <span>
                {{ data?.delivery.pickup_date }}
              </span>
              <div class=""></div>
            </div>

            <div
              class="w-full flex gap-4 items-center border-2 border-foreground p-2 rounded-md"
            >
              <Clock class="size-5 text-muted-foreground" />
              <span>{{ data.delivery.pickup_hour }}</span>
            </div>
          </div>
        </section>

        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <template v-if="isLoading">
            <div>
              <p class="text-2xl font-semibold">Description</p>
              <UiSkeleton class="w-full h-30" />
            </div>
          </template>

          <div v-else-if="data?.description !== null" class="space-y-2">
            <p class="text-2xl font-semibold">Description</p>

            <div
              v-if="data?.description !== null"
              class="border-2 border-secondary resize-none rounded-md p-2"
            >
              {{ data?.description }}
            </div>
          </div>

          <div class="space-y-2">
            <p class="text-2xl font-semibold">Gift Card</p>
            <template v-if="isLoading">
              <UiSkeleton class="w-full h-30" />
            </template>
            <div
              v-else
              class="flex items-center gap-2 mt-2 pointer-events-none cursor-default"
            >
              <UiCheckbox
                class="border-2 border-foreground"
                :model-value="data?.gift_card"
              />
              <UiLabel class="text-sm">Gift Card</UiLabel>
            </div>
            <div
              v-if="data?.gift_card"
              class="border-2 border-secondary resize-none rounded-md p-2"
            >
              {{ data?.gift_description }}
            </div>
          </div>
        </section>

        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Invoice</p>
          <template v-if="isLoading">
            <UiSkeleton class="w-full h-40" />
          </template>
          <div v-else class="grid gap-2">
            <div class="flex justify-between">
              <p>Total Price ({{ totalProduct }} product)</p>
              <p class="font-bold">
                Rp{{ formatRupiah(data?.total_price || 0) }}
              </p>
            </div>
            <div
              v-if="data?.delivery.delivery_type === 'delivery'"
              class="flex justify-between"
            >
              <p>Total Delivery Cost</p>
              <p v-if="data?.delivery.delivery_price" class="font-bold">
                Rp{{ formatRupiah(data?.delivery.delivery_price || 0) }}
              </p>
            </div>
            <div class="content-[''] h-px w-full bg-foreground" />
            <div class="flex justify-between text-lg md:text-xl">
              <p>Total Payment</p>
              <UiSkeleton v-if="isLoading" class="w-36 h-8" />
              <p
                v-else-if="
                  data?.delivery.delivery_price &&
                  data?.delivery.delivery_type === 'delivery'
                "
                class="font-bold"
              >
                Rp{{
                  formatRupiah(
                    data?.total_price + data?.delivery.delivery_price,
                  )
                }}
              </p>
              <p v-else class="font-bold">
                Rp{{ formatRupiah(data?.total_price || 0) }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

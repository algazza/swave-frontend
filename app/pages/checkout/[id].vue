<script setup lang="ts">
definePageMeta({
  layout: "checkout",
});

import { ref } from "vue";
import { DateFormatter, getLocalTimeZone, now } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
import { Field, Form, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import { ChevronLeft, Clock, Home, MapPin } from "lucide-vue-next";
import { CalendarIcon } from "lucide-vue-next";

import { addressSingle } from "~/lib/data";
import { cn } from "~/lib/utils";
import { formatRupiah } from "~/lib/utils";
import { useCartStore } from "~/store/CartStore";
import { CheckoutSchema, type CheckoutType } from "~/types/checkout";
import type { AddressType } from "~/types/user";

const router = useRouter();
const cartStore = useCartStore();
const schema = toTypedSchema(CheckoutSchema);

const df = new DateFormatter("id-ID", {
  dateStyle: "long",
});
const zone = getLocalTimeZone();
const minDate = now(zone)
  .add({ days: 4 })
  .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
const date = ref<DateValue>();
const time = ref("");

const deliveryType = ref("");
const checkbox = ref(true);

const address: AddressType = addressSingle;
const deliveryCost = 20000;

const initialData = {
  deliveries: {
    delivery_type: "",
    pickup_date: "",
    pickup_hour: "",
    address_id: address.id,
  },
  product_checkout: cartStore.checkoutProduct.map((item) => ({
    quantity: item.quantity,
    product_id: item.product.id,
    product_variant_id: item.variant.id,
  })),
  gift_card: true,
  gift_description: "",
};

const totalProduct = cartStore.checkoutProduct.reduce(
  (sum, item) => sum + item.quantity,
  0
);
const totalQuantity = cartStore.checkoutProduct.reduce(
  (sum, item) => sum + item.price,
  0
);

const totalPrice = cartStore.checkoutProduct.reduce(
  (total, item) => total + item.variant.price * (item.quantity || 0),
  0
);

const onInput = (e: Event, field: any) => {
  let val = (e.target as HTMLInputElement).value.replace(/\D/g, "");

  if (val.length >= 3) val = val.slice(0, 2) + ":" + val.slice(2, 4);
  else if (val.length > 2) val = val.slice(0, 2) + ":" + val.slice(2);

  const [h, m] = val.split(":").map(Number);
  if ((h ?? 0) > 23)
    val = "23:" + (m ? String(m).padStart(2, "0").slice(0, 2) : "");
  if ((m ?? 0) > 59)
    val = (String(h).padStart(2, "0").slice(0, 2) || "00") + ":59";

  const formatted = val.slice(0, 5);

  time.value = formatted;

  field.onChange(formatted);
};

const formatToDDMMYYYY = (dateValue: DateValue | undefined) => {
  if (!dateValue) return "";

  const jsDate = dateValue.toDate(getLocalTimeZone());

  const day = String(jsDate.getDate()).padStart(2, "0");
  const month = String(jsDate.getMonth() + 1).padStart(2, "0");
  const year = jsDate.getFullYear();

  return `${year}-${month}-${day}`;
};

const goBack = () => {
  cartStore.clearCheckout();
  router.back();
};

const onSubmit = (values: any) => {
  console.log(JSON.stringify(values, null, 2));
};
</script>

<template>
  <section class="pb-20">
    <div class="flex gap-2 py-5 items-center justify-start">
      <button @click="goBack">
        <ChevronLeft class="size-8" />
      </button>
      <h2 class="text-2xl">Checkout</h2>
    </div>

    <Form
      :validation-schema="schema"
      :initial-values="initialData"
      class="flex flex-col gap-5 lg:flex-row"
      @submit="onSubmit"
    >
      <div class="grid gap-5 flex-1 lg:h-fit">
        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <div class="flex justify-between items-center">
            <span class="text-2xl font-semibold">Address</span>
            <span v-if="address" class="font-bold underline">Change</span>
          </div>
          <div v-if="address" class="grid gap-1">
            <div class="flex justify-start items-center gap-2">
              <div
                class="p-1 bg-secondary rounded-md flex items-center justify-center gap-2"
              >
                <Home />
                <span class="font-semibold">
                  {{ address.label }}
                </span>
              </div>
              <div
                v-if="address.main_address === true"
                class="p-1 border border-foreground rounded-md flex items-center justify-center gap-2"
              >
                <MapPin />
                <span class="font-semibold">Main Address</span>
              </div>
            </div>
            <p class="text-lg font-semibold">{{ address.recipient }}</p>
            <p>
              {{ address.address }}, {{ address.subdistrict }},
              {{ address.city }}, {{ address.zip_code }}
            </p>
          </div>

          <p v-else class="text-muted-foreground">
            No Address available. Please add an address
          </p>
          <UiButton v-if="!address" class="bg-foreground text-background"
            >+ Add Address</UiButton
          >
        </section>

        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Product Checkout</p>

          <div v-for="check in cartStore.checkoutProduct" class="grid gap-3">
            <div class="flex gap-5">
              <div class="size-20 aspect-square overflow-hidden">
                <NuxtImg
                  :src="check.product.product_image"
                  :alt="check.product.name"
                  class="w-full h-full object-cover object-center outline-hidden"
                />
              </div>

              <div class="w-full flex justify-between items-end">
                <div class="grid">
                  <div class="p-1 bg-secondary w-fit">
                    {{ check.product.categories
                    }}{{
                      check.variant.variant !== check.product.categories
                        ? `, ${check.variant.variant}`
                        : ""
                    }}
                  </div>

                  <h2 class="text-xl mt-2 mb-1">{{ check.product.name }}</h2>
                  <p class="">Rp{{ formatRupiah(check.variant.price) }}</p>
                </div>
                <span class="text-xs">Stok: {{ check.quantity }}</span>
              </div>
            </div>

            <div class="content-[''] h-px w-full bg-foreground" />

            <div class="flex justify-between items-center">
              <span>Total Checkout:</span>
              <span class="font-bold">Rp{{ formatRupiah(check.price) }}</span>
            </div>
          </div>
        </section>
      </div>

      <div class="grid gap-5 flex-1 lg:h-fit">
        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Delivery</p>

          <div>
            <Field name="deliveries.delivery_type" v-slot="{ field }">
              <UiSelect v-model="deliveryType" v-bind="field">
                <UiSelectTrigger
                  class="border-2 border-foreground text-foreground w-full"
                >
                  <UiSelectValue placeholder="Select Delivery" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectItem
                      value="pickup"
                      class="flex gap-2 font-semibold"
                    >
                      <span>Pick Up at SMK 8 Semarang </span>
                      <span class="text-muted-foreground">(Rp 0)</span>
                    </UiSelectItem>
                    <UiSelectItem
                      value="delivery"
                      class="flex gap-2 font-semibold"
                    >
                      <span>Delivery </span>
                      <span class="text-muted-foreground"
                        >(Rp{{ formatRupiah(deliveryCost) }})</span
                      >
                    </UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
            </Field>
            <ErrorMessage
              class="text-destructive text-sm"
              name="deliveries.delivery_type"
            />
          </div>

          <p v-if="deliveryType === 'pickup'" class="text-2xl font-semibold">
            Pick Date and Time
          </p>
          <div
                id="gift_card"
            v-if="deliveryType === 'pickup'"
            class="flex gap-3 w-full items-start"
          >
            <div class="w-full">
              <Field name="deliveries.pickup_date" v-slot="{ field }">
                <UiPopover>
                  <UiPopoverTrigger as-child>
                    <UiButton
                id="gift_card"
                      variant="outline"
                      :class="
                        cn(
                          'w-full justify-start text-left font-normal flex-1 border-2 border-foreground',
                          !date && 'text-muted-foreground'
                        )
                      "
                    >
                      <CalendarIcon class="mr-2 h-4 w-4" />
                      {{
                        date
                          ? df.format(date.toDate(getLocalTimeZone()))
                          : "Pick a date"
                      }}
                    </UiButton>
                  </UiPopoverTrigger>

                  <UiPopoverContent class="w-auto p-0">
                    <UiCalendar
                      :min-value="minDate"
                      v-model="date"
                      @update:modelValue="(v: DateValue | undefined) => {
                          field.onChange(formatToDDMMYYYY(v));
                      }"
                    />
                  </UiPopoverContent>
                </UiPopover>

                <ErrorMessage
                  class="text-destructive text-sm"
                  name="deliveries.pickup_date"
                />
              </Field>
            </div>

            <div class="w-full">
              <Field name="deliveries.pickup_hour" v-slot="{ field }">
                <div class="flex gap-2 items-center flex-1">
                  <UiInputGroup class="border-2 border-foreground px-2">
                    <UIInputGroupAddon>
                      <Clock class="size-5 text-muted-foreground" />
                    </UIInputGroupAddon>
                    <UiInputGroupInput
                      v-model="time"
                      @input="(e: Event) => onInput(e, field)"
                      placeholder="hh:mm"
                      maxlength="5"
                    />
                  </UiInputGroup>
                </div>
                <ErrorMessage
                  class="text-destructive text-sm"
                  name="deliveries.pickup_hour"
                />
              </Field>
            </div>
          </div>
        </section>

        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Description (optional)</p>
          <Field name="description" v-slot="{ field }">
            <UiTextarea
              v-bind="field"
              placeholder="I smell like teen spirit..."
              class="border-2 border-secondary resize-none"
            />
          </Field>

          <div class="flex items-center gap-2">
            <Field name="gift_card" v-slot="{ field }">
              <UiCheckbox
                id="gift_card"
                class="border-2 border-foreground"
                v-model="checkbox"
                @update:model-value="(v: boolean | 'indeterminate') => {
                  field.onChange(v)
                }"
              />
            </Field>
            <UiLabel for="gift-card" class="text-sm">Gift Card</UiLabel>
          </div>

          <div v-if="checkbox">
            <p class="text-2xl font-semibold">Gift Card Description</p>
            <Field name="gift_description" v-slot="{ field }">
              <UiTextarea
                v-bind="field"
                placeholder="Dear God.."
                class="border-2 border-secondary resize-none"
              />
            </Field>
            <ErrorMessage
              class="text-destructive text-sm"
              name="gift_description"
            />
          </div>
        </section>

        <section class="grid gap-4 p-4 border-2 border-secondary rounded-xl">
          <p class="text-2xl font-semibold">Invoice</p>
          <div class="grid gap-2">
            <div class="flex justify-between">
              <p>Total Price ({{ totalProduct }} product)</p>
              <p class="font-bold">Rp{{ formatRupiah(totalQuantity) }}</p>
            </div>
            <div class="flex justify-between">
              <p>Total Delivery Cost</p>
              <p class="font-bold">Rp{{ formatRupiah(deliveryCost) }}</p>
            </div>
            <div class="content-[''] h-px w-full bg-foreground" />
            <div class="flex justify-between text-xl">
              <p>Total Payment</p>
              <p class="font-bold">
                Rp{{ formatRupiah(totalPrice + deliveryCost) }}
              </p>
            </div>
            <UiButton class="w-full">Chose Payment</UiButton>
          </div>
        </section>
      </div>
    </Form>
  </section>
</template>

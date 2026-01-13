<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { ErrorMessage, Field, Form } from "vee-validate";
import { EditAddressSchema, type AddressType } from "~/types/address";
import { useEditAddress } from "~/composables/address/useEditAddress";
import AlertCity from "./AlertCity.vue";

const props = defineProps<{
  address: AddressType | undefined;
}>();

const validationSchema = toTypedSchema(EditAddressSchema);
const { mutate, isPending, error } = useEditAddress();
const isOpen = ref(false);

const initialValues = computed(() => ({
  id: props.address?.id ?? 0,
  recipient: props.address?.recipient ?? "",
  label: props.address?.label ?? "Home",
  city: "Semarang",
  subdistrict: "Jawa Tengah",
  address: props.address?.address ?? "",
  zip_code: String(props.address?.zip_code) ?? "",
  main_address: props.address?.main_address ?? false,
}));

const onSubmit = (values: any) => {
  mutate(values, {
    onSuccess: () => {
      isOpen.value = false;
    },
  });
};
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger class="cursor-pointer">
      <slot />
    </UiDialogTrigger>

    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Edit Address</UiDialogTitle>
      </UiDialogHeader>

      <AlertCity />

      <Form
        :validation-schema="validationSchema"
        :initial-values="initialValues"
        v-slot="{ meta }"
        @submit="onSubmit"
      >
        <div class="grid gap-4">
          <Field name="recipient" v-slot="{ field }">
            <div>
              <UiInput
                v-bind="field"
                name="recipient"
                placeholder="Recipient"
                class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none"
                :default-value="initialValues.recipient"
              />
              <ErrorMessage class="text-destructive" name="recipient" />
            </div>
          </Field>

          <div>
            <Field name="label" v-slot="{ field }">
              <UiSelect
                v-bind="field"
                name="label"
                placeholder="Select Label"
                :default-value="initialValues.label"
              >
                <UiSelectTrigger
                  class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none w-full"
                >
                  <UiSelectValue placeholder="Select Label" />
                </UiSelectTrigger>

                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectItem value="Home">Home</UiSelectItem>
                    <UiSelectItem value="Office">Office</UiSelectItem>
                    <UiSelectItem value="School">School</UiSelectItem>
                    <UiSelectItem value="Apartment">Apartment</UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
              <ErrorMessage class="text-destructive" name="label" />
            </Field>
          </div>

          <Field name="city" v-slot="{ field }">
            <div>
              <UiInput
                v-bind="field"
                name="city"
                placeholder="City"
                disabled
                class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none"
                :default-value="initialValues.city"
              />
              <ErrorMessage class="text-destructive" name="city" />
            </div>
          </Field>

          <Field name="subdistrict" v-slot="{ field }">
            <div>
              <UiInput
                v-bind="field"
                name="subdistrict"
                placeholder="Subdistrict"
                disabled
                class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none"
                :default-value="initialValues.subdistrict"
              />
              <ErrorMessage class="text-destructive" name="subdistrict" />
            </div>
          </Field>

          <Field name="zip_code" v-slot="{ field }">
            <div>
              <UiInput
                :model-value="field.value"
                @update:model-value="
                  (value) => field.onChange(String(value || ''))
                "
                @blur="field.onBlur"
                name="zip_code"
                placeholder="Zip Code"
                type="number"
                class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none"
                :default-value="initialValues.zip_code"
              />
              <ErrorMessage class="text-destructive" name="zip_code" />
            </div>
          </Field>

          <Field name="address" v-slot="{ field }">
            <div>
              <UiTextarea
                v-bind="field"
                name="address"
                placeholder="Full Address"
                class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none resize-none"
                :default-value="initialValues.address"
              />
              <ErrorMessage class="text-destructive" name="address" />
            </div>
          </Field>

          <Field name="main_address" v-slot="{ field }">
            <div class="flex gap-2 items-center">
              <UiCheckbox
                @update:model-value="(v: boolean | 'indeterminate') => {
                  field.onChange(v)
                }"
                v-model="field.value"
                class="border border-foreground"
                label="Set as Main Address"
                name="main_address"
              />
              <UiLabel>Main Address</UiLabel>
            </div>
          </Field>
        </div>

        <p v-if="error" class="text-red-500 text-sm mt-2">
          {{ error.message || "Edit Address gagal" }}
        </p>

        <UiDialogFooter class="mt-6">
          <UiDialogClose as-child>
            <UiButton variant="outline"> Cancel </UiButton>
          </UiDialogClose>
          <UiButton
            type="submit"
            :loading="isPending"
            :disabled="!meta.dirty || !meta.valid || isPending"
          >
            Save changes
          </UiButton>
        </UiDialogFooter>
      </Form>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { ErrorMessage, Field, Form } from "vee-validate";
import { useAddAddress } from "~/composables/address/useAddAddress";
import { AddAddressSchema } from "~/types/address";
import AlertCity from "./AlertCity.vue";

const validationSchema = toTypedSchema(AddAddressSchema);
const { mutate, isPending, error } = useAddAddress();
const isOpen = ref(false);

const initialValues = {
  city: "Semarang",
  subdistrict: "Jawa Tengah",
  main_address: false,
};

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
        <UiDialogTitle>Add Address</UiDialogTitle>
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
              />
              <ErrorMessage class="text-destructive" name="recipient" />
            </div>
          </Field>

          <div>
            <Field name="label" v-slot="{ field }">
              <UiSelect v-bind="field" name="label" placeholder="Select Label">
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
                default-value="Semarang"
                v-bind="field"
                name="city"
                placeholder="City"
                disabled
                class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none"
              />
              <ErrorMessage class="text-destructive" name="city" />
            </div>
          </Field>

          <Field name="subdistrict" v-slot="{ field }">
            <div>
              <UiInput
                default-value="Jawa Tengah"
                v-bind="field"
                name="subdistrict"
                placeholder="Subdistrict"
                disabled
                class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none"
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
                class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none resize-none break-all"
              />
              <ErrorMessage class="text-destructive" name="address" />
            </div>
          </Field>

          <Field name="description" v-slot="{ field }">
            <div>
              <UiTextarea
                v-bind="field"
                name="description"
                placeholder="Description (optional)"
                class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none resize-none break-all"
              />
              <ErrorMessage class="text-destructive" name="description" />
            </div>
          </Field>

          <Field name="main_address" v-slot="{ field }">
            <div class="flex gap-2 items-center">
              <UiCheckbox
                @update:model-value="(v: boolean | 'indeterminate') => {
                  field.onChange(v)
                }"
                class="border border-foreground"
                label="Set as Main Address"
                name="main_address"
              />
              <UiLabel>Main Address</UiLabel>
            </div>
          </Field>
        </div>

        <p v-if="error" class="text-red-500 text-sm mt-2">
          {{ error.message || "Add address gagal" }}
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

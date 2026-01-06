<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Field, Form } from "vee-validate";
import { useEditAddress } from "~/composables/address/useEditAddress";
import { EditAddressSchema, type AddressType } from "~/types/address";

const props = defineProps<{
  address: AddressType | undefined;
}>();

const validationSchema = toTypedSchema(EditAddressSchema);
const { mutate, isPending } = useEditAddress();
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
  description: props.address?.description ?? "",
}));

console.log(initialValues.value)

const onSubmit = (values: any) => {
  mutate(values, {
    onSuccess: () => {
      isOpen.value = false;
    },
  });
};
</script>

<template>
  <UiDialog>
    <UiDialogTrigger class="cursor-pointer">
      <slot />
    </UiDialogTrigger>

    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Test</UiDialogTitle>
      </UiDialogHeader>
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
        </div>

        <UiDialogFooter class="mt-6">
          <UiDialogClose as-child>
            <UiButton variant="outline">Cancel</UiButton>
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

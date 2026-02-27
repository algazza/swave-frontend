<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { ErrorMessage, Field, Form } from "vee-validate";
import { useAddCategory } from "~/composables/category/useAddCategory";
import { CategoryReqSchema } from "~/types/category";

const validationSchema = toTypedSchema(CategoryReqSchema);
const { mutate, isPending, error } = useAddCategory();
const isOpen = ref(false);

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
        <UiDialogTitle>Add New Category</UiDialogTitle>
      </UiDialogHeader>

      <Form
        :validation-schema="validationSchema"
        v-slot="{ meta }"
        @submit="onSubmit"
      >
        <Field name="category" v-slot="{ field }">
          <div>
            <UiInput
              v-bind="field"
              name="category"
              placeholder="Category"
              class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none"
            />
            <ErrorMessage class="text-destructive" name="category" />
          </div>
        </Field>

        <p v-if="error" class="text-red-500 text-sm mt-2">
          {{ error.message || "Add Category gagal" }}
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
            Add Category
          </UiButton>
        </UiDialogFooter>
      </Form>
    </UiDialogContent>
  </UiDialog>
</template>

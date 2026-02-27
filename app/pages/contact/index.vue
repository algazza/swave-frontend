<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Form, Field, ErrorMessage } from "vee-validate";
import type { FormActions } from "vee-validate";
import { useCreateContact } from "~/composables/contact/useCreateContact";
import { CreateContactSchema } from "~/types/contact";
import type { CreateContactType } from "~/types/contact";

const validationSchema = toTypedSchema(CreateContactSchema);
const { mutate, isPending, error } = useCreateContact();

const topicOptions = [
  "Critique",
  "Report a bug",
  "Return request",
  "Partnership or collaboration",
  "General question",
  "Other",
];

const onSubmit = (
  values: any,
  actions: FormActions<CreateContactType>,
) => {
  mutate(values, {
    onSuccess: () => {
      actions.resetForm();
    },
  });
};
</script>

<template>
  <div class="mx-auto w-full max-w-2xl px-4 py-8">
    <h1 class="mb-2 text-2xl font-semibold">Contact us</h1>
    <p class="mb-6 text-sm text-gray-600">
      Send complaints, enquiries, and other messages.
    </p>

    <Form
      :validation-schema="validationSchema"
      @submit="onSubmit"
      class="space-y-5"
    >
      <div>
        <label for="name" class="mb-1 block text-sm font-medium">Name</label>
        <Field
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
        />
        <ErrorMessage name="name" class="mt-1 block text-sm text-red-600" />
      </div>

      <div>
        <label for="email" class="mb-1 block text-sm font-medium">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
        />
        <ErrorMessage name="email" class="mt-1 block text-sm text-red-600" />
      </div>

      <div>
        <label for="topic" class="mb-1 block text-sm font-medium">Topic</label>
        <Field name="topic" v-slot="{ field, handleChange }">
          <UiSelect
            :model-value="field.value"
            @update:model-value="handleChange"
          >
            <UiSelectTrigger id="topic" class="w-full">
              <UiSelectValue placeholder="Select topic" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem
                v-for="topic in topicOptions"
                :key="topic"
                :value="topic"
              >
                {{ topic }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </Field>
        <ErrorMessage name="topic" class="mt-1 block text-sm text-red-600" />
      </div>

      <div>
        <label for="description" class="mb-1 block text-sm font-medium">
          Message
        </label>
        <Field
          id="description"
          name="description"
          as="textarea"
          rows="6"
          placeholder="Write your message..."
          class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
        />
        <ErrorMessage
          name="description"
          class="mt-1 block text-sm text-red-600"
        />
      </div>

      <p v-if="error" class="text-sm text-red-600">
        {{ error?.message || "Failed to send message. Please try again." }}
      </p>

      <UiButton type="submit" :disabled="isPending">
        {{ isPending ? "Sending..." : "Send message" }}
      </UiButton>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Field, Form } from "vee-validate";
import { statusType } from "~/lib/constanta";
import { StatusCheckoutSchema } from "~/types/checkout";

const schema = toTypedSchema(StatusCheckoutSchema);
const open = ref(false);

const onSubmit = (values: any) => {
  console.log(JSON.stringify(values, null, 2));
  open.value = false;
};
</script>

<template>
  <UiDialog v-model:open="open">
    <UiDialogTrigger as-child>
      <slot />
    </UiDialogTrigger>

    <DialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Update Status</UiDialogTitle>
      </UiDialogHeader>
      <Form
        :validation-schema="schema"
        @submit="onSubmit"
        class="flex flex-col gap-3 p-4 border-2 border-secondary rounded-md"
      >
        <div>
          <div class="grid gap-2">
            <UiLabel>Select Status</UiLabel>
            <Field name="status_type" v-slot="{ field }">
              <UiSelect v-bind="field">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue
                    placeholder="Select a status"
                    class="capitalize"
                  />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectItem
                      v-for="item in statusType"
                      :value="item"
                      class="capitalize"
                    >
                      {{ item }}
                    </UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
            </Field>
          </div>

          <div class="grid gap-2">
            <UiLabel>Description (optional)</UiLabel>
            <Field name="description" v-slot="{ field }">
              <UiTextarea
                v-bind="field"
                placeholder="Unfortunately..."
                class="border-2 border-secondary resize-none"
              />
            </Field>
          </div>
        </div>
      </Form>
      <UiDialogFooter>
        <UiDialogClose>
          <UiButton variant="outline">Cancel</UiButton>
        </UiDialogClose>
        <UiButton type="submit"> Submit </UiButton>
      </UiDialogFooter>
    </DialogContent>
  </UiDialog>
</template>

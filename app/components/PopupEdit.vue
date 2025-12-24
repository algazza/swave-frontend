<script setup lang="ts">
import { computed } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { push } from "notivue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { useEditUser } from "~/composables/user/useEditUser";
import { EditUserSchema, type UserType } from "~/types/user";

const props = defineProps<{
  user: UserType | undefined;
}>();

const validationSchema = toTypedSchema(EditUserSchema);
const { mutate, isPending, error } = useEditUser();
const router = useRouter();

const initialValues = computed(() => ({
  name: props.user?.name ?? "",
  username: props.user?.username ?? "",
  phone: props.user?.phone ?? "",
}));

const onSubmit = (values: any) => {
  mutate(values, {
    onSuccess: () => {
      router.go(0);
      push.success("Success edit user");
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
        <UiDialogTitle>Edit Profile</UiDialogTitle>
      </UiDialogHeader>

      <Form
        :validation-schema="validationSchema"
        :initial-values="initialValues"
        v-slot="{ meta }"
        @submit="onSubmit"
      >
        <div class="grid gap-4">
          <Field name="name" v-slot="{ field }">
            <div class="grid gap-1">
              <UiLabel>Name</UiLabel>
              <UiInput
                v-bind="field"
                name="name"
                placeholder="Name"
                :default-value="initialValues.name"
              />
              <ErrorMessage class="text-destructive" name="name" />
            </div>
          </Field>

          <Field name="username" v-slot="{ field }">
            <div class="grid gap-1">
              <UiLabel>Username</UiLabel>
              <UiInput
                v-bind="field"
                name="username"
                placeholder="Username"
                :default-value="initialValues.username"
              />
              <ErrorMessage class="text-destructive" name="username" />
            </div>
          </Field>

          <Field name="phone" v-slot="{ field }">
            <div class="grid gap-1">
              <UiLabel>Phone</UiLabel>
              <UiInput
                v-bind="field"
                name="phone"
                placeholder="Phone"
                :default-value="initialValues.phone"
              />
              <ErrorMessage class="text-destructive" name="phone" />
            </div>
          </Field>
        </div>

        <p v-if="error" class="text-red-500 text-sm mt-2">
          {{ error.message || "Register gagal" }}
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

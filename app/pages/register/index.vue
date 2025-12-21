<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { ErrorMessage, Field, Form } from "vee-validate";
import { useRegister } from "~/composables/auth/useRegister";
import { logoBlack } from "~/lib/image";
import { RegisterSchema, type UserType } from "~/types/user";

const router = useRouter();
const validationSchema = toTypedSchema(RegisterSchema);
const { mutate, isPending, error } = useRegister();

const onSubmit = (values: any) => {
  const { confirm_password, ...payload } = values;
  console.log(payload);
  mutate(payload, {
    onSuccess: (data: any) => {
      const token = useCookie<string | null>("token");
      token.value = data.token;
      console.log(data);

      router.push("/");
    },
  });
};
</script>

<template>
  <section
    class="flex justify-center items-center w-full h-[calc(100dvh-80px)]"
  >
    <div class="grid gap-5">
      <div class="flex flex-col justify-center items-center text-center">
        <NuxtImg alt="logo" :src="logoBlack" class="h-20" />
        <h1 class="text-3xl lg:text-5xl">Welcome to Swavers</h1>
        <p class="text-muted-foreground">Please register to start shopping</p>
      </div>

      <Form
        :validation-schema="validationSchema"
        @submit="onSubmit"
        class="grid gap-4"
      >
        <div class="grid gap-2">
          <Field name="name" v-slot="{ field }">
            <div>
              <UiInput
                v-bind="field"
                name="name"
                placeholder="Name"
                class="focus-visible:outline-0 focus-visible:ring-0 border-0 border-b border-secondary rounded-none shadow-none placeholder:"
              />
              <ErrorMessage class="text-destructive" name="name" />
            </div>
          </Field>

          <Field name="username" v-slot="{ field }">
            <div>
              <UiInput
                v-bind="field"
                name="username"
                placeholder="Username"
                class="focus-visible:outline-0 focus-visible:ring-0 border-0 border-b border-secondary rounded-none shadow-none placeholder:"
              />
              <ErrorMessage class="text-destructive" name="username" />
            </div>
          </Field>

          <Field name="phone" v-slot="{ field }">
            <div>
              <UiInput
                v-bind="field"
                name="phone"
                placeholder="Phone"
                class="focus-visible:outline-0 focus-visible:ring-0 border-0 border-b border-secondary rounded-none shadow-none placeholder:"
              />
              <ErrorMessage class="text-destructive" name="phone" />
            </div>
          </Field>

          <Field name="password" v-slot="{ field }">
            <div>
              <UiInput
                v-bind="field"
                name="password"
                placeholder="Password"
                type="password"
                class="focus-visible:outline-0 focus-visible:ring-0 border-0 border-b border-secondary rounded-none shadow-none placeholder:"
              />
              <ErrorMessage class="text-destructive" name="password" />
            </div>
          </Field>

          <Field name="confirm_password" v-slot="{ field }">
            <div>
              <UiInput
                v-bind="field"
                name="confirm_password"
                placeholder="Confirm Password"
                type="password"
                class="focus-visible:outline-0 focus-visible:ring-0 border-0 border-b border-secondary rounded-none shadow-none placeholder:"
              />
              <ErrorMessage class="text-destructive" name="confirm_password" />
            </div>
          </Field>
        </div>
        <p v-if="error" class="text-red-500 text-sm mt-2">
          {{ error.message || "Register gagal" }}
        </p>
        <UiButton :loading="isPending" type="submit">Register</UiButton>
        <p class="font-semibold text-muted-foreground text-center">
          Already Have Account?
          <NuxtLink to="/login" class="text-foreground">Login</NuxtLink>
        </p>
      </Form>
    </div>
  </section>
</template>

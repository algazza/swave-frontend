<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { ErrorMessage, Field, Form } from "vee-validate";
import { useLogin } from "~/composables/auth/useLogin";
import { logoBlack } from "~/lib/image";
import { LoginSchema, type UserType } from "~/types/user";

const router = useRouter();
const validationSchema = toTypedSchema(LoginSchema);
const { mutate, isPending, error } = useLogin();

const onSubmit = (values: any) => {
  mutate(values, {
    onSuccess: (data: any) => {
      console.log(data)
      const token = useCookie<string | null>("token");
      token.value = data.token;

        router.push("/");
    },
  });
};
</script>

<template>
  <section class="py-20 flex justify-center items-center w-full h-dvh">
    <div class="grid gap-5">
      <div class="flex flex-col justify-center items-center text-center">
        <NuxtImg alt="logo" :src="logoBlack" class="h-20" />
        <h1 class="text-3xl lg:text-5xl">Welcome back, Swavers</h1>
        <p class="text-muted-foregroun">Please sign into your account</p>
      </div>

      <Form
        :validation-schema="validationSchema"
        @submit="onSubmit"
        class="grid gap-4"
      >
        <div class="grid gap-2">
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
        </div>
        <p v-if="error" class="text-red-500 text-sm mt-2">
          {{ error.message || "Login gagal" }}
        </p>
        <UiButton :loading="isPending" type="submit">Register</UiButton>
        <p class="font-semibold text-muted-foreground text-center">
          Doesn’t have an account?
          <NuxtLink href="/register" class="text-foreground">Register</NuxtLink>
        </p>
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Star } from "lucide-vue-next";
import { ErrorMessage, Field, Form } from "vee-validate";
import { useAddReview } from "~/composables/review/useAddReview";
import { addReviewSchema } from "~/types/review";

const props = defineProps<{
  productId: number;
  orderId: string;
  productImg: string;
  productName: string;
  productVariant?: string;
  productCategory?: string;
}>();
const isOpen = ref(false);
const validationSchema = toTypedSchema(addReviewSchema);
const { mutate, isPending, error } = useAddReview();

const initialValues = {
  order_id: props.orderId,
  product_id: props.productId,
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
    <UiDialogTrigger class="cursor-pointer w-full">
      <slot />
    </UiDialogTrigger>

    <UiDialogContent>
      <Form
        class="space-y-4"
        :validation-schema="validationSchema"
        :initial-values="initialValues"
        @submit="onSubmit"
        v-slot="{ setFieldValue }"
      >
        <h1 class="text-4xl">Review Product</h1>

        <div class="space-y-3">
          <div class="p-10 bg-secondary flex justify-center items-center">
            <div class="size-60 aspect-square md:size-72">
              <NuxtImg
                :src="productImg"
                alt="Product Image"
                class="w-full h-full overflow-hidden object-center object-cover"
              />
            </div>
          </div>

          <div class="space-y-1">
            <p class="">
              {{ productCategory
              }}{{
                productVariant !== productCategory ? `, ${productVariant}` : ""
              }}
            </p>
            <h2 class="text-2xl">{{ productName }}</h2>
          </div>
        </div>

        <div>
          <Field name="star" v-slot="{ field }">
            <div class="space-y-2">
              <div class="flex gap-2">
                <Star
                  v-for="i in 5"
                  :key="i"
                  @click="setFieldValue('star', i)"
                  :class="[
                    'cursor-pointer transition-colors',
                    i <= (field.value || 0) ? 'text-accent' : 'text-secondary',
                  ]"
                />
              </div>
              <ErrorMessage class="text-destructive" name="star" />
            </div>
          </Field>

          <Field name="description" v-slot="{ field }">
            <div>
              <UiTextarea
                v-bind="field"
                name="description"
                placeholder="Description"
                class="focus-visible:outline-0 focus-visible:ring-0 border-0 border-b border-secondary rounded-none break-all shadow-none resize-none"
              />
              <ErrorMessage class="text-destructive" name="description" />
            </div>
          </Field>
        </div>

        <p v-if="error" class="text-red-500 text-sm mt-2">
          {{ error.message || "Add review gagal" }}
        </p>

        <UiDialogFooter>
          <UiButton type="submit" class="w-full" :loading="isPending">
            Send
          </UiButton>
        </UiDialogFooter>
      </Form>
    </UiDialogContent>
  </UiDialog>
</template>

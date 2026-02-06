<script setup lang="ts">
import { formatDate } from "@vueuse/core";
import { ChevronLeft } from "lucide-vue-next";
import { useReview } from "~/composables/review/useReview";
import { useUnreview } from "~/composables/review/useUnreview";

definePageMeta({
  layout: "account",
  middleware: "auth",
});

const {
  data: review,
  isLoading: isLoadingReview,
  isError: isErrorReview,
  error: errorReview,
} = useReview();
if (isErrorReview.value) {
  throw errorReview;
}
const {
  data: unreview,
  isLoading: isLoadingUnreview,
  isError: isErrorUnreview,
  error: errorUnreview,
} = useUnreview();
if (isErrorUnreview.value) {
  throw errorUnreview;
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex gap-3 items-center mb-5">
      <NuxtLink to="/account" class="lg:hidden">
        <ChevronLeft />
      </NuxtLink>
      <h2 class="text-3xl">Review Product</h2>
    </div>

    <div v-if="isLoadingReview" class="w-full">
      <UiSkeleton v-for="i in 2" class="h-44 w-full mb-6" />
    </div>

    <p
      class="text-center text-muted-foreground mt-2"
      v-if="
        review && unreview && review?.length === 0 && unreview?.length === 0
      "
    >
      No checkout found.
    </p>

    <div v-else class="space-y-2">
      <AccountReviewCardItem
        v-for="item in review"
        :item="item"
        :key="item.id"
      />
      <p
        v-if="review && review.length === 0"
        class="text-muted-foreground text-center"
      >
        No reviews found.
      </p>
    </div>

    <UiSeparator
      v-if="unreview && unreview?.length > 0"
      class="w-full h-px my-9"
    />

    <div v-if="isLoadingUnreview" class="w-full">
      <UiSkeleton v-for="i in 2" class="h-44 w-full mb-6" />
    </div>

    <div v-if="unreview && unreview.length > 0" class="space-y-2">
      <h2 class="text-2xl">Not Yet Reviewed</h2>
      <AccountReviewOtherProductCard
        v-for="data in unreview"
        :data="data"
        :key="data.id"
      />
    </div>
  </div>
</template>

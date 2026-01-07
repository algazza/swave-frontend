<script setup lang="ts">
const isOpen = ref(false);

const props = defineProps<{
  service: string;
  title: string;
  description: string;
  fnSubmit: () => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
}>();

const onSubmit = () => {
  props.fnSubmit();
  isOpen.value = false;
};
</script>

<template>
  <UiAlertDialog v-model:open="isOpen">
    <UiAlertDialogTrigger class="cursor-pointer">
      <slot />
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>{{ title }}</UiAlertDialogTitle>
        <UiAlertDialogDescription>
          {{ description }}
        </UiAlertDialogDescription>
        <p v-if="isError" class="text-destructive">{{ error }}</p>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel class="btn btn-outline">
          Cancel
        </UiAlertDialogCancel>
        <UiAlertDialogAction
          class="btn btn-destructive"
          @click="onSubmit"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Processing...</span>
          <span v-else>{{ service }}</span>
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>

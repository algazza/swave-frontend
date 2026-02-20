<script setup lang="ts">
defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "confirm"): void;
}>();
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <slot />
    </UiAlertDialogTrigger>

    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle
          >Are you sure you want to delete "{{ title }}"?</UiAlertDialogTitle
        >
        <UiAlertDialogDescription>
          This action cannot be undone. This will permanently delete the
          {{ title }} and all associated data.
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
        <UiAlertDialogAction variant="destructive" @click="emit('confirm')"
          >Delete</UiAlertDialogAction
        >
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Notivue v-slot="item">
      <NotivueSwipe :item="item">
        <Notification :item="item" />
      </NotivueSwipe>
    </Notivue>
  </div>
</template>

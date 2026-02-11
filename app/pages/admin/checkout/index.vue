<script setup lang="ts">
import { checkoutData } from '~/lib/data';
import { columns } from './column';

definePageMeta({
  layout: 'admin'
})
</script>

<template>
    <section class="p-6">
        <h1 class="text-2xl">Order History</h1>
         <AdminDataTable :columns="columns" :data="checkoutData" />
    </section>
</template>
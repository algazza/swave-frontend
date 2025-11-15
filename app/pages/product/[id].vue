<script setup lang="ts">
import { Star } from "lucide-vue-next";
import { dummyProduct, productData } from "~/lib/data";
import { formatRupiah } from "~/lib/utils";

const DataProduct = productData;

const currentImg = ref(0);
const emblaApi = ref<any>(null);

const onInitApi = (api: any) => {
  emblaApi.value = api;

  api.on("select", () => {
    currentImg.value = api.selectedScrollSnap();
  });
};

const goTo = (i: number) => {
  if (!emblaApi.value) return;
  emblaApi.value.scrollTo(i);
};
</script>

<template>
  <section class="flex flex-col gap-5">
    <section class="grid lg:grid-cols-3 gap-8 py-5 justify-center items-center">
      <div class="grid gap-5 max-lg:hidden">
        <div class="grid gap-2">
          <h1 class="text-3xl">{{ DataProduct.name }}</h1>
          <p class="">Rp{{ formatRupiah(DataProduct.price) }}</p>
          <div class="flex gap-5 items-center">
            <span>Stok: {{ DataProduct.stock }}</span>
            <span>Sold: {{ DataProduct.sold }}</span>
            <div class="flex gap-2 items-center">
              <Star class="text-accent" />
              <span>{{ DataProduct.star }}</span>
            </div>
          </div>
        </div>

        <div class="grid gap-2">
          <h2 class="text-2xl font-normal">variant</h2>
          <div class="flex items-center flex-wrap gap-3">
            <div
              v-for="variant in DataProduct.variants"
              :key="variant.variant"
              class="px-4 py-2 bg-secondary rounded-xl"
            >
              {{ variant.variant }}
            </div>
          </div>
        </div>

        <div class="flex gap-5 w-full">
          <UiNumberField
            class="border border-foreground max-w-28"
            :default-value="1"
            :min="0"
          >
            <UiNumberFieldContent>
              <UiNumberFieldDecrement />
              <UiNumberFieldInput class="text-sm rounded-none" />
              <UiNumberFieldIncrement />
            </UiNumberFieldContent>
          </UiNumberField>

          <Button class="bg-foreground text-background px-2 w-full rounded-lg"
            >Add to cart</Button
          >
        </div>
      </div>

      <div class="grid justify-center">
        <UiCarousel
          class="relative w-full max-w-[360px]"
          :opts="{
            align: 'start',
            loop: true,
          }"
          @init-api="onInitApi"
        >
          <UiCarouselContent>
            <UiCarouselItem
              v-for="(img, index) in DataProduct.product_image"
              :key="index"
            >
              <div
                class="aspect-square relative"
                :class="index === 0 ? 'm-16' : ''"
              >
                <img
                  :src="img"
                  alt="Pick"
                  class="w-full h-full object-cover object-center"
                />
              </div>
            </UiCarouselItem>
          </UiCarouselContent>
        </UiCarousel>
        <div class="flex gap-3 items-center justify-center">
          <button
            v-for="(img, i) in DataProduct.product_image"
            :key="i"
            @click="goTo(i)"
            class="w-3 h-3 rounded-full transition-all mt-4"
            :class="
              i === currentImg ? 'bg-foreground' : 'bg-secondary'
            "
          />
        </div>
      </div>

      <div class="grid gap-5 lg:hidden">
        <div class="grid gap-2">
          <h1 class="text-3xl">{{ DataProduct.name }}</h1>
          <p class="">Rp{{ formatRupiah(DataProduct.price) }}</p>
          <div class="flex gap-5 items-center">
            <span>Stok: {{ DataProduct.stock }}</span>
            <span>Sold: {{ DataProduct.sold }}</span>
            <div class="flex gap-2 items-center">
              <Star class="text-accent" />
              <span>{{ DataProduct.star }}</span>
            </div>
          </div>
        </div>

        <div class="grid gap-2">
          <h2 class="text-2xl font-normal">variant</h2>
          <div class="flex items-center flex-wrap gap-3">
            <div
              v-for="variant in DataProduct.variants"
              :key="variant.variant"
              class="px-4 py-2 bg-secondary rounded-xl"
            >
              {{ variant.variant }}
            </div>
          </div>
        </div>

        <div class="flex gap-5 w-full">
          <UiNumberField
            class="border border-foreground max-w-28"
            :default-value="1"
            :min="0"
          >
            <UiNumberFieldContent>
              <UiNumberFieldDecrement />
              <UiNumberFieldInput class="text-sm rounded-none" />
              <UiNumberFieldIncrement />
            </UiNumberFieldContent>
          </UiNumberField>

          <Button class="bg-foreground text-background px-2 w-full rounded-lg"
            >Add to cart</Button
          >
        </div>
      </div>

      <div class="grid gap-5">
        <p class="">
          {{ DataProduct.description }}
        </p>
        <div>
          <h2 class="text-3xl">Review</h2>
          <UiCarousel
            class="relative"
            :opts="{
              align: 'start',
              loop: true,
            }"
          >
            <UiCarouselContent>
              <UiCarouselItem
                v-for="review in DataProduct.reviews"
                :key="review.name"
              >
                <div class="p-4 border border-foreground grid gap-2 max-w-full">
                  <h3 class="text-2xl">{{ review.name }}</h3>
                  <div class="flex items-center">
                    <Star
                      v-for="i in 5"
                      :key="i"
                      :class="
                        review.star >= i ? 'text-accent' : 'text-secondary'
                      "
                    />
                  </div>
                  <p class="text-base">”{{ review.description }}”</p>
                </div>
              </UiCarouselItem>
            </UiCarouselContent>
          </UiCarousel>
        </div>
      </div>
    </section>

    <section class="py-10">
      <h1 class="text-4xl mb-6 text-center">Related Products</h1>
      <div class="text-end">
        <NuxtLink
          to="/product"
          class="mb-3 text-base font-semibold text-muted-foreground"
        >
          See More
        </NuxtLink>
      </div>

      <div class="grid grid-cols-2 gap-y-6 gap-x-2 md:grid-cols-4">
        <CardProduct v-for="product in dummyProduct" :product="product" />
      </div>
    </section>
  </section>
</template>

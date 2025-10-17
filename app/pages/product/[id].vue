<script setup lang="ts">
import { Star } from "lucide-vue-next";
import { dummyProduct, reviewArray } from "~/lib/data";
import { ModelPick, NecklessEpidemic, PickEpidemic } from "~/lib/image";

const image = [PickEpidemic, ModelPick, NecklessEpidemic];
  
const countStock = ref(0);
const currentImg = ref(0);

const onSlideChange = (index: number) => {
  currentImg.value = index
}

const goTo =(index: number) => {
  currentImg.value = index
}
</script>

<template>
  <section class="flex flex-col gap-5">
    <section class="grid gap-8 py-5">
      <div class="">
        <UiCarousel
          class="relative w-full"
          :opts="{
            align: 'start',
            loop: true,
          }"
        >
          <UiCarouselContent>
            <UiCarouselItem v-for="(img, index) in image" :key="index">
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
            class="w-3 h-3 rounded-full transition-all mt-4"
            :class="i === currentImg ? 'bg-foreground' : 'bg-secondary'"
            v-for="(img, i) in image"
            :key="i"
          />
        </div>
      </div>

      <div class="grid gap-5">
        <div class="grid gap-2NecklessEpidemic">
          <h1 class="text-3xl">Epidemic Groove</h1>
          <p class="">Rp 5000</p>
          <div class="flex gap-5 items-center">
            <span>Stok: 10</span>
            <span>Sold: 100</span>
            <div class="flex gap-2 items-center">
              <Star class="text-accent" />
              <span>5.0</span>
            </div>
          </div>
        </div>

        <div class="grid gap-2">
          <h2 class="text-2xl font-normal">variant</h2>
          <div class="flex items-center flex-wrap gap-3">
            <div class="px-4 py-2 bg-secondary rounded-xl">Pick</div>
            <div class="px-4 py-2 bg-secondary rounded-xl">Keychain</div>
            <div class="px-4 py-2 bg-secondary rounded-xl">Necklace</div>
          </div>
        </div>

        <div class="flex gap-5 w-full">
          <div
            class="border-[1px] border-foreground flex gap-3 items-center font-bold"
          >
            <div
              class="size-8 flex justify-center items-center"
              @click="countStock > 0 && countStock--"
              :class="
                countStock <= 0
                  ? 'cursor-not-allowed text-secondary'
                  : 'cursor-pointer'
              "
            >
              -
            </div>
            <span>{{ countStock }}</span>
            <div
              class="size-8 flex justify-center items-center cursor-pointer"
              @click="countStock++"
            >
              +
            </div>
          </div>
          <Button class="bg-foreground text-background px-2 w-full rounded-lg"
            >Add to cart</Button
          >
        </div>
      </div>

      <div class="grid gap-5">
        <p class="">
          A product short description is a concise and brief overview of a
          product, providing key information to potential customers. Typically,
          it is a brief summary that highlights the most important features,
          benefits,
        </p>
        <div
          class="p-4 border-[1px] border-foreground grid gap-2"
          v-for="review in reviewArray"
          :key="review.name"
        >
          <h3 class="text-2xl">{{ review.name }}</h3>
          <div class="flex gap-2 items-center">
            <Star
              v-for="i in 5"
              :key="i"
              :class="review.star >= i ? 'text-accent' : 'text-secondary'"
            />
          </div>
          <p class="text-base">”{{ review.description }}”</p>
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

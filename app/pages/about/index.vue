<script setup lang="ts">
import { ourValues, theTeam } from "~/lib/constanta";
import { AboutImg1, Cherish } from "~/lib/image";

definePageMeta({
  layout: "about",
});
const currentCard = ref(0);
const emblaApi = ref<any>(null);

const onInitApi = (api: any) => {
  emblaApi.value = api;

  api.on("select", () => {
    currentCard.value = api.selectedScrollSnap();
  });
};

const goTo = (i: number) => {
  if (!emblaApi.value) return;
  emblaApi.value.scrollTo(i);
};
</script>

<template>
  <section class="px-4 md:px-10 lg:px-20 flex justify-center">
    <div class="max-w-300 w-full">
      <section
        class="py-10 flex flex-col gap-6 md:py-20 md:flex-row-reverse md:justify-center md:items-center md:gap-16 lg:gap-24"
      >
        <div
          class="rounded-lg overflow-hidden aspect-square size-full md:size-96 md:flex-none lg:size-136"
        >
          <NuxtImg
            :src="AboutImg1"
            class="size-full object-center object-contain"
          />
        </div>

        <div class="space-y-4 md:space-y-8">
          <h2 class="text-3xl text-start md:text-5xl">
            The Beginning of Excellence
          </h2>
          <div class="space-y-3 md:space-y-4">
            <p class="text-muted-foreground">
              In the heart of Paris, 1985, Marie-Claire Dubois opened the doors
              to what would become one of the world's most coveted jewelry
              ateliers. With nothing but a vision for timeless elegance and a
              small collection of handcrafted pieces, she began a journey that
              would redefine luxury jewelry.
            </p>
            <p class="text-muted-foreground">
              What started as a boutique workshop in the Marais district has
              evolved into an international symbol of sophistication, where each
              piece tells a story of passion, precision, and uncompromising
              artistry.
            </p>
          </div>
        </div>
      </section>

      <section class="py-10 space-y-6 md:space-y-12 md:py-20">
        <h1
          class="text-3xl text-center after:content-[''] after:block after:w-1/5 after:mx-auto after:h-px after:bg-foreground md:text-6xl"
        >
          Meet Our Founder
        </h1>

        <div
          class="flex flex-col gap-6 justify-center md:flex-row md:items-center md:gap-16 lg:gap-24"
        >
          <div class="mx-auto space-y-4 md:space-y-8">
            <div
              class="rounded-lg overflow-hidden aspect-square size-60 md:size-80 lg:size-96"
            >
              <NuxtImg
                :src="Cherish"
                class="size-full object-center object-contain"
              />
            </div>
            <div class="text-center space-y-2">
              <h2 class="text-2xl md:text-3xl">Cherish Putria Salsabilla</h2>
              <p class="text-muted-foreground">Founder & Creative Director</p>
            </div>
          </div>

          <div class="space-y-4 md:space-y-8">
            <h2 class="text-xl text-center font-bold md:text-2xl md:text-start">
              "Jewelry is not just an accessory; it's a language that speaks to
              the soul."
            </h2>
            <div class="space-y-3 text-muted-foreground md:space-y-4">
              <p>
                Born into a family of Parisian artisans, Marie-Claire discovered
                her passion for jewelry design at the age of twelve when she
                found her grandmother's collection of vintage brooches in an old
                cedar chest. This moment ignited a lifelong fascination with the
                power of precious metals and stones to capture memories and
                emotions.
              </p>
              <p>
                After studying at the prestigious École Boulle and apprenticing
                under master jewelers in Place Vendôme, Marie-Claire developed
                her signature style: pieces that balance classical French
                elegance with contemporary innovation. Her philosophy centers on
                creating jewelry that enhances the wearer's natural beauty while
                telling their unique story.
              </p>
              <p>
                Today, Marie-Claire continues to personally oversee every design
                that bears the Lumière name, ensuring that each piece meets the
                exacting standards that have made the brand synonymous with
                luxury and refinement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>

  <section
    class="px-4 md:px-10 lg:px-20 flex justify-center bg-foreground text-background"
  >
    <div class="max-w-300 w-full">
      <section
        class="py-10 flex flex-col gap-6 md:py-20 md:flex-row-reverse md:justify-center md:items-center md:gap-16 lg:gap-24"
      >
        <div
          class="rounded-lg overflow-hidden aspect-square size-full md:size-96 md:flex-none lg:size-136"
        >
          <NuxtImg
            :src="AboutImg1"
            class="size-full object-center object-contain"
          />
        </div>

        <div class="space-y-4 md:space-y-8">
          <h2 class="text-3xl text-start md:text-5xl">Our Philosophy</h2>
          <div class="text-secondary space-y-3 md:space-y-4">
            <p>
              At Lumière, we believe that true luxury lies not in ostentation,
              but in the perfect harmony of design, craftsmanship, and emotion.
              Every piece we create is a testament to our commitment to
              excellence and our respect for the ancient art of jewelry making.
            </p>
            <p>
              We source our materials ethically, work with suppliers who share
              our values, and ensure that every step of our process honors both
              the environment and the communities that make our work possible.
            </p>
            <p>
              Our goal is simple: to create jewelry that becomes an integral
              part of your story, pieces that you'll treasure for a lifetime and
              pass down through generations.
            </p>
          </div>
        </div>
      </section>
    </div>
  </section>

  <section class="px-4 md:px-10 lg:px-20 flex justify-center">
    <div class="max-w-300 w-full">
      <section class="py-10 space-y-8 md:space-y-12 md:py-20">
        <div class="text-center space-y-2 md:space-y-4">
          <h1 class="text-3xl md:text-6xl">Our Values</h1>
          <p class="">
            The principles that guide every decision and inspire every creation
          </p>
        </div>

        <div
          class="flex flex-col gap-8 justify-center items-center md:flex-row md:items-start md:gap-16 lg:gap-24"
        >
          <div v-for="value in ourValues" :key="value.title" class="space-y-2">
            <div class="w-fit p-4 rounded-full bg-primary/10 mx-auto">
              <component :is="value.icon" class="size-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold text-center md:text-2xl">
              {{ value.title }}
            </h3>
            <p class="text-center">{{ value.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </section>

  <section class="px-4 md:px-10 lg:px-20 flex justify-center">
    <div class="max-w-300 w-full">
      <section class="py-10 space-y-8 md:space-y-12 md:py-20">
        <div class="text-center space-y-2 md:space-y-4">
          <h1 class="text-3xl md:text-6xl">The Artisans</h1>
          <p class="">
            Behind every Swave piece is a team of master craftspeople, each
            bringing <br class="max-md:hidden" />
            decades of expertise and an unwavering commitment to excellence.
          </p>
        </div>

        <div class="grid justify-center">
          <UiCarousel
            class="relative w-full max-w-78 md:max-w-200 lg:max-w-300 mx-auto"
            :opts="{
              align: 'start',
              loop: true,
            }"
            @init-api="onInitApi"
          >
            <UiCarouselContent>
              <UiCarouselItem
                v-for="(team, index) in theTeam"
                :key="index"
                class="md:basis-1/2 lg:basis-1/3"
              >
                <div class="space-y-4 flex flex-col justify-center items-center">
                  <div
                    class="rounded-lg overflow-hidden aspect-square size-60 md:size-80 lg:size-80"
                  >
                    <NuxtImg
                      :src="team.image"
                      class="size-full object-center object-contain"
                    />
                  </div>

                  <div>
                    <h3 class="text-xl font-bold text-center md:text-2xl">
                      {{ team.name }}
                    </h3>
                    <p class="text-center text-muted-foreground">
                      {{ team.title }}
                    </p>
                    <p class="text-center">
                      {{ team.description }}
                    </p>
                  </div>
                </div>
              </UiCarouselItem>
            </UiCarouselContent>
          </UiCarousel>
          <div class="flex gap-3 items-center justify-center mt-3">
            <button
              v-for="(img, i) in theTeam"
              :key="i"
              @click="goTo(i)"
              class="w-3 h-3 rounded-full transition-all mt-4"
              :class="i === currentCard ? 'bg-foreground' : 'bg-secondary'"
            />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

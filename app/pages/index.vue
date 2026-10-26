<script setup lang="ts">
import { ArrowUpRight, Mail, Menu, X } from "lucide-vue-next";

definePageMeta({
  layout: "about",
});

const isMenuOpen = ref(false);
const email = ref("");
const subscriptionMessage = ref("");

const products = [
  {
    name: "Naga Pendant",
    detail: "Sculptural pendant",
    image: "/images/KalungNaga.png",
  },
  {
    name: "Strawberry Pendant",
    detail: "Playful silver form",
    image: "/images/KalungStroberi.png",
  },
  {
    name: "Seated Figure",
    detail: "Hand-finished pendant",
    image: "/images/KalungOrangDuduk.png",
  },
  {
    name: "Mask Pendant",
    detail: "Polished statement piece",
    image: "/images/KalungTopeng.png",
  },
];

const subscribe = () => {
  if (!email.value || !email.value.includes("@")) {
    subscriptionMessage.value = "Masukkan alamat email yang valid.";
    return;
  }

  subscriptionMessage.value =
    "Terima kasih. Kami akan segera menghubungi Anda.";
  email.value = "";
};
</script>

<template>
  <div class="-mx-4 -mt-20 md:-mx-10 lg:-mx-20">
    <section
      class="relative min-h-170 overflow-hidden bg-[#deddd8] px-6 pb-14 pt-28 md:px-12 lg:px-20 lg:pt-36"
    >
      <div
        class="mx-auto grid min-h-145 max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <div class="relative z-1 max-w-xl">
          <p
            class="mb-8 font-mono text-[10px] uppercase tracking-[0.28em] text-[#55534e]"
          >
            Swave / Objects to keep
          </p>
          <h1
            class="max-w-155 text-[clamp(4.2rem,10vw,9.5rem)] leading-[0.8] tracking-[-0.04em] text-[#181817]"
          >
            Wear your<br />wonder.
          </h1>
          <p class="mt-10 max-w-sm text-sm leading-7 text-[#4b4945]">
            Perhiasan kecil dengan karakter besar. Dibuat untuk menemani gerak
            sehari-hari, bukan sekadar disimpan.
          </p>
          <NuxtLink
            to="/product"
            class="mt-8 inline-flex min-h-12 items-center gap-3 bg-[#181817] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#f2f1ed] transition-colors duration-300 hover:bg-[#484641] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#181817]"
          >
            Explore collection
            <ArrowUpRight class="size-4" aria-hidden="true" />
          </NuxtLink>
        </div>

        <div class="relative mx-auto w-full max-w-155 lg:mr-0">
          <div
            class="absolute -left-10 top-8 hidden h-px w-28 bg-[#8e8b83] lg:block"
            aria-hidden="true"
          />
          <NuxtImg
            src="/images/KalungDeadClown.png"
            alt="Kalung berbentuk figur dengan detail sculptural"
            class="h-130 w-full object-contain object-center md:h-155"
          />
          <p
            class="absolute bottom-0 right-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[#55534e]"
          >
            Fig. 01 / Dead Clown
          </p>
        </div>
      </div>
    </section>

    <section id="collection" class="bg-[#f2f1ed] px-6 py-24 md:px-12 lg:px-20">
      <div class="mx-auto max-w-7xl">
        <div
          class="mb-14 flex flex-col justify-between gap-5 border-b border-[#c9c7c0] pb-6 md:flex-row md:items-end"
        >
          <div>
            <p
              class="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#66635c]"
            >
              01 / The collection
            </p>
            <h2 class="text-5xl leading-none text-[#181817] md:text-7xl">
              A little<br />unusual.
            </h2>
          </div>
          <p class="max-w-xs text-sm leading-6 text-[#5b5953]">
            Bentuk-bentuk yang terasa akrab, lalu dibuat sedikit berbeda.
          </p>
        </div>

        <div
          class="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-8"
        >
          <NuxtLink
            v-for="(product, index) in products"
            :key="product.name"
            to="/product"
            class="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#181817]"
            :class="index === 1 ? 'md:mt-16' : index === 3 ? 'md:mt-8' : ''"
          >
            <div class="relative aspect-4/5 overflow-hidden bg-[#e6e4df]">
              <NuxtImg
                :src="product.image"
                :alt="product.name"
                class="h-full w-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <span
                class="absolute bottom-3 right-3 bg-[#f2f1ed] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#4b4945]"
                >0{{ index + 1 }}</span
              >
            </div>
            <div
              class="mt-4 flex items-start justify-between gap-3 border-t border-[#c9c7c0] pt-3"
            >
              <div>
                <h3 class="text-lg text-[#181817]">{{ product.name }}</h3>
                <p class="mt-1 text-xs text-[#67645d]">{{ product.detail }}</p>
              </div>
              <ArrowUpRight
                class="mt-1 size-4 shrink-0 text-[#67645d] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
          </NuxtLink>
        </div>

        <div class="mt-16 text-center">
          <NuxtLink
            to="/product"
            class="inline-block border-b border-[#181817] pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#181817] transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#181817]"
            >View all pieces</NuxtLink
          >
        </div>
      </div>
    </section>

    <section
      class="border-y border-[#c9c7c0] bg-[#181817] px-6 py-24 text-[#f2f1ed] md:px-12 lg:px-20"
    >
      <div
        class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
      >
        <div>
          <p
            class="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#b9b6ae]"
          >
            02 / The point of view
          </p>
          <h2 class="max-w-lg text-5xl leading-[0.9] md:text-7xl">
            Not precious.<br /><em>Personal.</em>
          </h2>
        </div>
        <div class="max-w-xl lg:justify-self-end">
          <p class="text-lg leading-8 text-[#d0cdc5]">
            Swave berangkat dari rasa ingin memakai sesuatu yang terasa dekat.
            Perhiasan yang boleh disentuh, dipakai berulang, dan punya cerita
            baru setiap hari.
          </p>
          <NuxtLink
            to="/about"
            class="mt-8 inline-flex items-center gap-3 border-b border-[#f2f1ed] pb-2 text-xs font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2f1ed]"
            >Read our story <ArrowUpRight class="size-4" aria-hidden="true"
          /></NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-[#f2f1ed] px-6 py-24 md:px-12 lg:px-20">
      <div
        class="mx-auto grid max-w-7xl gap-12 border-b border-[#c9c7c0] pb-24 lg:grid-cols-[1fr_0.8fr] lg:items-end"
      >
        <div>
          <p
            class="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#66635c]"
          >
            03 / Stay close
          </p>
          <h2
            class="max-w-xl text-5xl leading-[0.9] text-[#181817] md:text-7xl"
          >
            A note from<br /><em>Swave.</em>
          </h2>
        </div>
        <form class="max-w-md lg:justify-self-end" @submit.prevent="subscribe">
          <label for="email" class="text-sm leading-6 text-[#5b5953]"
            >Dapatkan kabar tentang karya baru dan sesi bespoke.</label
          >
          <div class="mt-6 flex border-b border-[#181817] pb-2">
            <Mail class="mr-3 mt-1 size-4 text-[#55534e]" aria-hidden="true" />
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="Email address"
              class="min-w-0 flex-1 bg-transparent text-sm text-[#181817] placeholder:text-[#77736c] focus:outline-none"
            />
            <button
              type="submit"
              class="ml-3 min-h-11 px-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#181817] transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#181817]"
            >
              Join
            </button>
          </div>
          <p
            v-if="subscriptionMessage"
            class="mt-3 text-xs text-[#55534e]"
            role="status"
          >
            {{ subscriptionMessage }}
          </p>
        </form>
      </div>
    </section>

    <button
      v-if="isMenuOpen"
      type="button"
      class="fixed inset-0 z-30 bg-[#181817]/40 lg:hidden"
      aria-label="Close navigation menu"
      @click="isMenuOpen = false"
    />
    <div
      v-if="isMenuOpen"
      class="fixed right-4 top-4 z-40 w-[min(320px,calc(100vw-2rem))] border border-[#c9c7c0] bg-[#f2f1ed] p-6 lg:hidden"
    >
      <div
        class="flex items-center justify-between border-b border-[#c9c7c0] pb-4"
      >
        <span class="font-mono text-[10px] uppercase tracking-[0.2em]"
          >Navigate</span
        >
        <button
          type="button"
          class="grid size-11 place-items-center"
          aria-label="Close navigation menu"
          @click="isMenuOpen = false"
        >
          <X class="size-5" />
        </button>
      </div>
      <nav class="grid gap-5 pt-6 text-2xl" aria-label="Mobile navigation">
        <NuxtLink to="/" @click="isMenuOpen = false">Home</NuxtLink>
        <NuxtLink to="/product" @click="isMenuOpen = false"
          >Collection</NuxtLink
        >
        <NuxtLink to="/about" @click="isMenuOpen = false">Our story</NuxtLink>
        <NuxtLink to="/contact" @click="isMenuOpen = false">Contact</NuxtLink>
      </nav>
    </div>

    <button
      type="button"
      class="fixed bottom-6 right-6 z-20 grid size-12 place-items-center border border-[#181817] bg-[#f2f1ed] lg:hidden"
      aria-label="Open navigation menu"
      @click="isMenuOpen = true"
    >
      <Menu class="size-5" />
    </button>
  </div>
</template>

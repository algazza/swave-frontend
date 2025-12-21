import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    }
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/device",
    "shadcn-nuxt",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "notivue/nuxt",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  css: [
    "~/assets/css/tailwind.css",
    "notivue/notification.css",
    "notivue/animations.css",
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
  notivue: {
    enqueue: false, 
    limit: 1, 
  },
  components: true,
});

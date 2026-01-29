<script setup lang="ts">
import { Star, StarOff } from "lucide-vue-next";
import Autoplay from "embla-carousel-autoplay";
import { formatRupiah, isLocalImagePath } from "~/lib/utils";
import { useCartStore } from "~/store/CartStore";
import type { CheckoutProductType } from "~/types/checkout";
import type { ProductVariantsType } from "~/types/product";
import { useOneProducts } from "~/composables/product/useOneProduct";
import { useRecProduct } from "~/composables/product/useRecProduct";
import { useAddCart } from "~/composables/cart/useAddCart";

const API_URL = useRuntimeConfig().public.API_URL;
const route = useRoute();
const router = useRouter();
const token = useCookie("token");

const paramId = computed(() => route.params.id as string);

const {
  data: DataProduct,
  isPending: isProductPending,
  isError: isProductError,
  error: productError,
} = useOneProducts(paramId.value);

const {
  data: RecProducts,
  isPending: isRecPending,
  isError: isRecError,
  error: recError,
} = useRecProduct(paramId.value);

const {
  mutate,
  isPending: isAddCartPending,
  error: addCartError,
} = useAddCart();

if (isProductError.value) {
  throw productError;
} else if (isRecError.value) {
  throw recError;
}
const defaultVariant = computed(() => DataProduct.value?.variant?.[0]);

const cartStore = useCartStore();

const currentImg = ref(0);
const emblaApi = ref<any>(null);

const quantity = ref<number>(0);
const selectedVariant = reactive<ProductVariantsType>({
  id: defaultVariant.value?.id || 0,
  variant: defaultVariant.value?.variant || "",
  price: defaultVariant.value?.price || 0,
  stock: defaultVariant.value?.stock || 0,
});

watch(
  () => defaultVariant.value,
  (newVariant) => {
    if (newVariant) {
      Object.assign(selectedVariant, {
        id: newVariant.id,
        variant: newVariant.variant,
        price: newVariant.price,
        stock: newVariant.stock,
      });
    }
  },
);

const checkout = computed<CheckoutProductType>(() => {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    price: selectedVariant.price * quantity.value,
    quantity: quantity.value,
    variant: {
      id: selectedVariant.id,
      variant: selectedVariant.variant,
      price: selectedVariant.price,
      stock: selectedVariant.stock,
    },
    product: {
      id: DataProduct.value?.id!,
      name: DataProduct.value?.name!,
      product_images: DataProduct.value?.product_images[0]?.image_path!,
      category: DataProduct.value?.category!,
      sold: DataProduct.value?.sold!,
    },
  };
});

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

const setVariant = (v: ProductVariantsType) => {
  Object.assign(selectedVariant, v);
};

const resetCheckout = () => {
  if (defaultVariant.value) {
    Object.assign(selectedVariant, {
      id: defaultVariant.value.id,
      variant: defaultVariant.value.variant,
      price: defaultVariant.value.price,
      stock: defaultVariant.value.stock,
    });
  }

  quantity.value = 0;
};

const handleCart = () => {
  // cartStore.addToCart(checkout.value);
  mutate({
    product_id: DataProduct.value?.id!,
    variant_id: selectedVariant.id,
    quantity: quantity.value,
  });
  // push.success(`${DataProduct.value?.2name} has added to your cart`);
  resetCheckout();
};
</script>

<template>
  <section class="flex flex-col gap-5">
    <section
      class="lg:grid lg:grid-cols-3 space-y-8 space-x-8 py-5 justify-center items-center w-full flex-1"
    >
      <div class="grid gap-5 max-lg:hidden">
        <template v-if="isProductPending">
          <UiSkeleton class="w-full h-28" />
        </template>
        <template v-else>
          <div class="grid gap-2">
            <h1 class="text-3xl">{{ DataProduct?.name }}</h1>
            <p class="">
              Rp{{
                formatRupiah(
                  selectedVariant.price > 0 ? selectedVariant.price : 0,
                )
              }}
            </p>
            <div class="flex gap-5 items-center">
              <span
                >Stok:
                {{
                  selectedVariant.stock > 0 ? selectedVariant.stock : 0
                }}</span
              >
              <span>Sold: {{ DataProduct?.sold }}</span>
              <div class="flex gap-2 items-center">
                <Star class="text-accent" />
                <span>{{ DataProduct?.star }}</span>
              </div>
            </div>
          </div>
        </template>

        <div class="grid gap-2">
          <h2 class="text-2xl font-normal">variant</h2>
          <template v-if="isProductPending">
            <div class="flex items-center flex-wrap gap-3">
              <UiSkeleton
                class="w-20 h-9 max-lg:hidden"
                v-for="i in 3"
                :key="i"
              />
            </div>
          </template>
          <template v-else>
            <div class="flex items-center flex-wrap gap-3">
              <div
                v-for="v in DataProduct?.variant"
                :key="v.variant"
                class="px-4 py-2 rounded-xl cursor-pointer"
                :class="
                  selectedVariant.id === v.id
                    ? 'bg-foreground text-background'
                    : 'bg-secondary'
                "
                @click="setVariant(v)"
              >
                {{ v.variant }}
              </div>
            </div>
          </template>
        </div>

        <div class="flex gap-5 w-full">
          <UiNumberField
            v-model="quantity"
            class="border border-foreground max-w-28"
            :default-value="0"
            :min="0"
            :max="selectedVariant.stock"
          >
            <UiNumberFieldContent>
              <UiNumberFieldDecrement />
              <UiNumberFieldInput class="text-sm rounded-none" />
              <UiNumberFieldIncrement />
            </UiNumberFieldContent>
          </UiNumberField>

          <UiButton
            @click="!token ? router.push('/login') : handleCart()"
            class="flex-1 bg-foreground text-background px-2 rounded-lg"
            :disabled="quantity === 0 ? true : false || isAddCartPending"
          >
            Add to cart
          </UiButton>
        </div>
        <p v-if="addCartError" class="text-red-500 text-sm mt-2">
          {{ addCartError.message || "Add address gagal" }}
        </p>
      </div>

      <template v-if="isProductPending">
        <div class="grid justify-center">
          <UiSkeleton class="w-90 h-90" />
        </div>
      </template>
      <template v-else>
        <div class="grid justify-center">
          <UiCarousel
            class="relative w-full max-w-90"
            :opts="{
              align: 'start',
              loop: true,
            }"
            @init-api="onInitApi"
          >
            <UiCarouselContent>
              <UiCarouselItem
                v-for="(img, index) in DataProduct?.product_images"
                :key="index"
              >
                <div
                  class="aspect-square relative"
                  :class="index === 0 ? 'm-16' : ''"
                >
                  <NuxtImg
                    :src="
                      isLocalImagePath(img.image_path)
                        ? `${API_URL}/${img.image_path}`
                        : img.image_path
                    "
                    alt="Pick"
                    class="w-full h-full object-contain object-center"
                  />
                </div>
              </UiCarouselItem>
            </UiCarouselContent>
          </UiCarousel>
          <div class="flex gap-3 items-center justify-center">
            <button
              v-for="(img, i) in DataProduct?.product_images"
              :key="i"
              @click="goTo(i)"
              class="w-3 h-3 rounded-full transition-all mt-4"
              :class="i === currentImg ? 'bg-foreground' : 'bg-secondary'"
            />
          </div>
        </div>
      </template>

      <div class="grid gap-5 lg:hidden">
        <template v-if="isProductPending">
          <UiSkeleton class="w-full h-24" />
        </template>
        <template v-else>
          <div class="grid gap-2">
            <h1 class="text-3xl">{{ DataProduct?.name }}</h1>
            <p class="">
              Rp{{
                formatRupiah(
                  selectedVariant.price > 0 ? selectedVariant.price : 0,
                )
              }}
            </p>
            <div class="flex gap-5 items-center">
              <span
                >Stok:
                {{
                  selectedVariant.stock > 0 ? selectedVariant.stock : 0
                }}</span
              >
              <span>Sold: {{ DataProduct?.sold }}</span>
              <div class="flex gap-2 items-center">
                <Star class="text-accent" />
                <span>{{ DataProduct?.star }}</span>
              </div>
            </div>
          </div>
        </template>

        <div class="grid gap-2">
          <h2 class="text-2xl font-normal">variant</h2>
          <template v-if="isProductPending">
            <div class="flex items-center flex-wrap gap-3">
              <UiSkeleton
                class="w-20 h-9 max-lg:hidden"
                v-for="i in 3"
                :key="i"
              />
            </div>
          </template>
          <template v-else>
            <div class="flex items-center flex-wrap gap-3">
              <div
                v-for="v in DataProduct?.variant"
                :key="v.variant"
                class="px-4 py-2 rounded-xl cursor-pointer"
                :class="
                  selectedVariant.variant === v.variant
                    ? 'bg-foreground text-background'
                    : 'bg-secondary'
                "
                @click="setVariant(v)"
              >
                {{ v.variant }}
              </div>
            </div>
          </template>
        </div>

        <div class="flex gap-5 w-full">
          <UiNumberField
            v-model="quantity"
            class="border border-foreground max-w-28"
            :default-value="0"
            :min="0"
            :max="selectedVariant.stock"
          >
            <UiNumberFieldContent>
              <UiNumberFieldDecrement />
              <UiNumberFieldInput class="text-sm rounded-none" />
              <UiNumberFieldIncrement />
            </UiNumberFieldContent>
          </UiNumberField>

          <UiButton
            @click="!token ? router.push('/login') : handleCart()"
            class="flex-1 bg-foreground text-background px-2 rounded-lg"
            :disabled="quantity === 0 ? true : false || isAddCartPending"
          >
            Add to cart
          </UiButton>
        </div>
        <p v-if="addCartError" class="text-red-500 text-sm mt-2">
          {{ addCartError.message || "Add cart gagal" }}
        </p>
      </div>

      <div class="grid gap-5">
        <template v-if="isProductPending">
          <UiSkeleton class="w-full h-40" />
        </template>
        <template v-else>
          <p class="">
            {{ DataProduct?.description }}
          </p>
        </template>

        <div>
          <h2 class="text-3xl">Review</h2>
          <template v-if="isProductPending">
            <UiSkeleton class="w-full h-32" />
          </template>
          <template
            v-else-if="DataProduct?.review && DataProduct.review.length > 0"
          >
            <UiCarousel
              class="relative"
              :opts="{
                align: 'start',
                loop: true,
              }"
              :plugins="[
                Autoplay({
                  delay: 2000,
                }),
              ]"
            >
              <UiCarouselContent>
                <UiCarouselItem
                  v-for="review in DataProduct?.review"
                  :key="review.name"
                >
                  <div
                    class="p-4 border border-foreground grid gap-2 max-w-full"
                  >
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
          </template>
          <template v-else>
            <div
              class="py-8 border border-muted-foreground grid gap-2 max-w-full text-center text-muted-foreground"
            >
              <StarOff class="mx-auto" />
              No reviews yet.
            </div>
          </template>
        </div>
      </div>
    </section>

    <section class="py-10">
      <h1 class="text-4xl mb-6 text-center">Related Products</h1>
      <div class="text-end mb-3">
        <NuxtLink
          to="/product"
          class="text-base font-semibold text-muted-foreground"
        >
          See More
        </NuxtLink>
      </div>

      <template v-if="isRecPending">
        <div class="grid grid-cols-2 gap-y-6 gap-x-2 md:grid-cols-3">
          <UiSkeleton v-for="i in 4" :key="i" class="w-full h-80" />
        </div>
      </template>

      <template v-else>
        <div class="grid grid-cols-2 gap-y-6 gap-x-2 md:grid-cols-4">
          <CardProduct v-for="product in RecProducts" :product="product" />
        </div>
      </template>
    </section>
  </section>
</template>

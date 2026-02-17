<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Loader2,
  X,
  Plus,
  Trash2,
} from "lucide-vue-next";
import { Form, Field, ErrorMessage } from "vee-validate";
import {
  useUploadProduct,
  useUploadProductVariant,
} from "~/composables/product/useUploadProduct";
import { ProductReqSchema } from "~/types/product";
import { variantSchema } from "~/types/variant";
import { ref } from "vue";
import { useCategory } from "~/composables/category/useCategory";

definePageMeta({
  layout: "blank",
  middleware: ["auth", "admin"],
});

const combinedSchema = ProductReqSchema.merge(variantSchema);
const validationSchema = toTypedSchema(combinedSchema);

const { mutate: uploadProduct } = useUploadProduct();
const { mutate: uploadVariant } = useUploadProductVariant();

const {
  data: categories,
  isPending: isCategoriesPending,
  isError: isCategoriesError,
  error: categoriesError,
} = useCategory();

if (isCategoriesError.value) {
  throw categoriesError;
}

const images = ref<File[]>([]);
const imagePreviews = ref<string[]>([]);
const currentSlide = ref(0);
const isLoadingImage = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const isUploading = ref(false);
const uploadError = ref<string | null>(null);

const variants = ref([{ variant: "", price: 0, stock: 0 }]);

const MAX_IMAGES = 10;

const handleImageUpload = async (files: FileList | null) => {
  if (!files) return;

  const newFiles = Array.from(files);
  const availableSlots = MAX_IMAGES - images.value.length;
  const filesToAdd = newFiles.slice(0, availableSlots);

  isLoadingImage.value = true;

  for (const file of filesToAdd) {
    if (file.type.startsWith("image/")) {
      images.value.push(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.value.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  setTimeout(() => {
    isLoadingImage.value = false;
  }, 300);
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  handleImageUpload(e.dataTransfer?.files || null);
};

const nextSlide = () => {
  if (currentSlide.value < imagePreviews.value.length) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const removeImage = (index: number) => {
  images.value.splice(index, 1);
  imagePreviews.value.splice(index, 1);
  if (currentSlide.value > imagePreviews.value.length - 1) {
    currentSlide.value = Math.max(0, imagePreviews.value.length - 1);
  }
};

const openFileDialog = () => {
  fileInputRef.value?.click();
};

const addVariant = () => {
  variants.value.push({ variant: "", price: 0, stock: 0 });
};

const removeVariant = (index: number) => {
  if (variants.value.length > 1) {
    variants.value.splice(index, 1);
  }
};

const onSubmit = async (values: any) => {
  try {
    isUploading.value = true;
    uploadError.value = null;

    // Step 1: Upload product
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);

    images.value.forEach((image) => {
      formData.append("images", image);
    });

    // Upload product and wait for product ID
    uploadProduct(formData, {
      onSuccess: (productData: any) => {
        const productId = productData.data?.id || productData.id;

        if (!productId) {
          throw new Error("Product ID not found in response");
        }

        // Step 2: Upload variants with the product ID
        const variantPayload = {
          variants: values.variants,
        };

        uploadVariant(
          { productId, payload: variantPayload },
          {
            onSuccess: () => {
              isUploading.value = false;
              // Navigate to product list or show success message
              navigateTo("/admin/product");
            },
            onError: (error: any) => {
              isUploading.value = false;
              uploadError.value =
                error.message || "Failed to add product variants";
            },
          },
        );
      },
      onError: (error: any) => {
        isUploading.value = false;
        uploadError.value = error.message || "Failed to add product";
      },
    });
  } catch (error: any) {
    isUploading.value = false;
    uploadError.value = error.message || "An error occurred";
  }
};
</script>

<template>
  <section>
    <!-- Full Screen Loading Overlay -->
    <div
      v-if="isUploading"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-8 shadow-2xl max-w-md w-full mx-4">
        <div class="text-center">
          <Loader2 class="w-16 h-16 animate-spin mx-auto mb-4 text-primary" />
          <h3 class="text-xl font-semibold mb-2">Uploading Product</h3>
          <p class="text-gray-600 text-sm">
            Please wait while we upload your product and variants...
          </p>
          <div class="mt-4 space-y-2">
            <div
              class="flex items-center justify-center gap-2 text-sm text-gray-500"
            >
              <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span>Processing images and product details</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-2 items-center">
      <NuxtLink to="/admin/product"><ChevronLeft class="w-5" /></NuxtLink>
      <h1 class="text-2xl">Add Product</h1>
    </div>

    <Form
      :validation-schema="validationSchema"
      @submit="onSubmit"
      v-slot="{meta}"
      class="grid gap-8 lg:grid-cols-[384px_1fr] my-4"
    >
      <Field
        v-slot="{}"
        name="images"
        type="hidden"
        :value="images"
        class="hidden"
      />
      <div class="relative w-full flex flex-col items-center">
        <div
          class="relative aspect-square md:size-80 lg:size-96 rounded-lg overflow-hidden"
        >
          <div class="w-full h-full flex items-center justify-center relative">
            <div
              v-if="imagePreviews.length > 0"
              class="w-full h-full overflow-hidden"
            >
              <transition name="fade" mode="out-in">
                <img
                  :key="currentSlide"
                  :src="imagePreviews[currentSlide]"
                  :alt="`Product image ${currentSlide + 1}`"
                  class="w-full h-full object-center object-contain"
                />
              </transition>

              <div
                v-if="isLoadingImage"
                class="absolute inset-0 bg-black/40 flex items-center justify-center"
              >
                <div class="text-center text-white">
                  <Loader2 class="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p class="text-sm">Loading image...</p>
                </div>
              </div>

              <button
                @click="removeImage(currentSlide)"
                type="button"
                class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
              >
                <X class="w-4 h-4" />
              </button>

              <button
                v-if="imagePreviews.length > 1 && currentSlide > 0"
                @click="prevSlide"
                type="button"
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition z-10"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>

              <button
                v-if="
                  imagePreviews.length > 1 &&
                  currentSlide < imagePreviews.length - 1
                "
                @click="nextSlide"
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition z-10"
              >
                <ChevronRight class="w-5 h-5" />
              </button>

              <div
                v-if="imagePreviews.length > 1"
                class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm"
              >
                {{ currentSlide + 1 }} / {{ imagePreviews.length }}
              </div>
            </div>

            <div
              v-else-if="
                images.length === 0 || imagePreviews.length < MAX_IMAGES
              "
              @dragover="handleDragOver"
              @drop="handleDrop"
              @click="openFileDialog"
              class="w-full h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-gray-100 transition"
            >
              <Upload class="w-12 h-12 text-gray-400 mb-2" />
              <p class="text-gray-600 font-medium">Drag and drop images here</p>
              <p class="text-gray-400 text-sm">or click to select</p>
              <p class="text-gray-400 text-xs mt-2">
                {{ images.length }} / {{ MAX_IMAGES }} images
              </p>
            </div>
          </div>

          <input
            ref="fileInputRef"
            type="file"
            multiple
            accept="image/*"
            class="hidden"
            @change="
              (e) => handleImageUpload((e.target as HTMLInputElement).files)
            "
          />
        </div>

        <div
          v-if="imagePreviews.length > 0"
          class="flex gap-2 mt-4 overflow-x-auto pb-2"
        >
          <button
            v-for="(preview, index) in imagePreviews"
            :key="index"
            @click="currentSlide = index"
            type="button"
            class="shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition"
            :class="
              currentSlide === index
                ? 'border-primary'
                : 'border-gray-300 hover:border-gray-400'
            "
          >
            <img
              :src="preview"
              :alt="`Thumbnail ${index + 1}`"
              class="w-full h-full object-center object-contain"
            />
          </button>

          <button
            v-if="imagePreviews.length < MAX_IMAGES"
            @click="openFileDialog"
            type="button"
            class="shrink-0 w-16 h-16 rounded border-2 border-dashed border-gray-300 hover:border-primary flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition"
          >
            <Upload class="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <Field name="name" v-slot="{ field }">
          <div class="grid gap-2">
            <label for="name">Product Name</label>
            <UiInput
              v-bind="field"
              name="name"
              placeholder="Product Name"
              class="focus-visible:outline-0 focus-visible:ring-0 border-0 border-b border-secondary rounded-none shadow-none"
            />
            <ErrorMessage class="text-destructive" name="name" />
          </div>
        </Field>

        <Field name="description" v-slot="{ field }">
          <div class="grid gap-2">
            <label for="description">Description</label>
            <UiTextarea
              v-bind="field"
              name="description"
              placeholder="Description"
              class="focus-visible:outline-0 focus-visible:ring-0 border-0 border-b border-secondary rounded-none shadow-none resize-none"
            />
            <ErrorMessage class="text-destructive" name="description" />
          </div>
        </Field>

        <Field name="category" v-slot="{ field }">
          <div class="grid gap-2">
            <label for="category">Category</label>
            <div class="flex gap-8 items-center">
              <UiSkeleton v-if="isCategoriesPending" class="w-full h-8" />
              <UiSelect
                v-else-if="categories && categories?.length > 0"
                v-bind="field"
                name="category"
                placeholder="Select Category"
              >
                <UiSelectTrigger
                  class="focus-visible:outline-0 focus-visible:ring-0 rounded-md border-secondary shadow-none w-full"
                >
                  <UiSelectValue placeholder="Select Category" />
                </UiSelectTrigger>

                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectItem
                      v-for="category in categories"
                      :key="category.category"
                      :value="category.category"
                      >{{ category.category }}</UiSelectItem
                    >
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>

              <span
                v-if="categories && categories?.length > 0"
                class="text-gray-500"
                >or</span
              >

              <AdminProductCategoryDialog>
                <UiButton size="sm" variant="outline" class="w-full">
                  + Add New Category
                </UiButton>
              </AdminProductCategoryDialog>
            </div>
            <ErrorMessage class="text-destructive" name="category" />
          </div>
        </Field>

        <!-- Variants Section -->
        <div class="space-y-4 border-t pt-4 mt-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Product Variants</h3>
            <UiButton
              type="button"
              size="sm"
              variant="outline"
              @click="addVariant"
              class="gap-2"
            >
              <Plus class="w-4 h-4" />
              Add Variant
            </UiButton>
          </div>

          <Field
            v-for="(variant, index) in variants"
            :key="index"
            :name="`variants[${index}]`"
            v-slot="{}"
            :value="variant"
          >
            <div class="border rounded-lg p-4 space-y-3 bg-gray-50">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium"
                  >Variant {{ index + 1 }}</label
                >
                <UiButton
                  v-if="variants.length > 1"
                  type="button"
                  size="sm"
                  variant="ghost"
                  @click="removeVariant(index)"
                  class="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 class="w-4 h-4" />
                </UiButton>
              </div>

              <Field :name="`variants[${index}].variant`" v-slot="{ field }">
                <div class="grid gap-2">
                  <label :for="`variant-name-${index}`" class="text-sm"
                    >Name</label
                  >
                  <UiInput
                    v-bind="field"
                    :id="`variant-name-${index}`"
                    placeholder="e.g., Small, Red, etc."
                    class="focus-visible:outline-0 focus-visible:ring-0 border-secondary"
                  />
                  <ErrorMessage
                    class="text-destructive text-sm"
                    :name="`variants[${index}].variant`"
                  />
                </div>
              </Field>

              <div class="grid grid-cols-2 gap-3">
                <Field :name="`variants[${index}].price`" v-slot="{ field }">
                  <div class="grid gap-2">
                    <label :for="`variant-price-${index}`" class="text-sm"
                      >Price</label
                    >
                    <UiInput
                      v-bind="field"
                      :id="`variant-price-${index}`"
                      type="number"
                      min="0"
                      placeholder="0"
                      class="focus-visible:outline-0 focus-visible:ring-0 border-secondary"
                    />
                    <ErrorMessage
                      class="text-destructive text-sm"
                      :name="`variants[${index}].price`"
                    />
                  </div>
                </Field>

                <Field :name="`variants[${index}].stock`" v-slot="{ field }">
                  <div class="grid gap-2">
                    <label :for="`variant-stock-${index}`" class="text-sm"
                      >Stock</label
                    >
                    <UiInput
                      v-bind="field"
                      :id="`variant-stock-${index}`"
                      type="number"
                      min="0"
                      placeholder="0"
                      class="focus-visible:outline-0 focus-visible:ring-0 border-secondary"
                    />
                    <ErrorMessage
                      class="text-destructive text-sm"
                      :name="`variants[${index}].stock`"
                    />
                  </div>
                </Field>
              </div>
            </div>
          </Field>
        </div>

        <p v-if="uploadError" class="text-red-500 text-sm mt-2">
          {{ uploadError }}
        </p>

        <UiButton :disabled="!meta.valid || !meta.dirty || isUploading" type="submit" class="w-full">
          <Loader2 v-if="isUploading" class="w-4 h-4 mr-2 animate-spin" />
          {{ isUploading ? "Uploading..." : "Add Product" }}
        </UiButton>
      </div>
    </Form>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

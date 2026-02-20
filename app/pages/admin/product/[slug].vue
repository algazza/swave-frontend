<script setup lang="ts">
import { useOneProducts } from "~/composables/product/useOneProduct";
import { useEditProduct } from "~/composables/product/useEditProduct";
import {
  addProductImage,
  updateProductImage,
  deleteProductImage,
} from "~/composables/product/useProductImage";
import { useUploadProductVariant } from "~/composables/variant/useAddVariant";
import { useEditVariant } from "~/composables/variant/useEditVariant";
import { useDeleteVariant } from "~/composables/variant/useDeleteVariant";
import { useCategory } from "~/composables/category/useCategory";
import type { ProductVariantsType } from "~/types/product";
import { isLocalImagePath } from "~/lib/utils";
import { Trash2, X } from "lucide-vue-next";

definePageMeta({
  middleware: ["auth", "admin"],
  layout: "admin",
});

const API_URL = useRuntimeConfig().public.API_URL;
const route = useRoute();
const router = useRouter();
const slug = computed(() => route.params.slug as string);

const {
  data: product,
  isPending,
  isError,
  error,
  refetch,
} = useOneProducts(slug);

if (isError.value) {
  throw error;
}
const { data: categories } = useCategory();

const editProductMutation = useEditProduct(slug);
const addImageMutation = addProductImage(slug);
const updateImageMutation = updateProductImage(slug);
const deleteImageMutation = deleteProductImage(slug);
const addVariantMutation = useUploadProductVariant(slug);
const editVariantMutation = useEditVariant(slug);
const deleteVariantMutation = useDeleteVariant(slug);

const isEditingProduct = ref(false);
const isEditingVariant = ref(false);
const isAddingVariant = ref(false);
const isAddingImage = ref(false);
const editingImageId = ref<number | null>(null);

const MAX_IMAGES = 10;

const productForm = ref({
  name: "",
  description: "",
  category: "",
});

const variantForm = ref({
  variant: "",
  price: 0,
  stock: 0,
});

const editVariantForm = ref({
  variant: "",
  price: 0,
  stock: 0,
});

const editVariantOriginalName = ref("");

const newImages = ref<File[]>([]);
const updateImageFile = ref<File | null>(null);
const isDraggingAdd = ref(false);
const isDraggingUpdate = ref(false);

const newImagePreviews = computed(() => {
  return newImages.value.map((file) => URL.createObjectURL(file));
});

const updateImagePreview = computed(() => {
  return updateImageFile.value
    ? URL.createObjectURL(updateImageFile.value)
    : null;
});

onUnmounted(() => {
  newImagePreviews.value.forEach((url) => URL.revokeObjectURL(url));
  if (updateImagePreview.value) {
    URL.revokeObjectURL(updateImagePreview.value);
  }
});

watch(
  product,
  (newProduct) => {
    if (newProduct) {
      productForm.value = {
        name: newProduct.name,
        description: newProduct.description,
        category: newProduct.category,
      };
    }
  },
  { immediate: true },
);

// Handle product edit
const handleEditProduct = async () => {
  if (!product.value) return;

  try {
    const result = await editProductMutation.mutateAsync({
      productId: product.value.id,
      payload: productForm.value,
    });

    // Extract the new slug from response (check multiple possible locations)
    const newSlug =
      result?.data?.data?.slug || result?.data?.slug || result?.slug;

    console.log("Edit result:", result);
    console.log("New slug:", newSlug);
    console.log("Current slug:", slug.value);

    // If the slug changed, navigate to the new URL
    if (newSlug && newSlug !== slug.value) {
      // Close the edit mode first
      isEditingProduct.value = false;
      // Navigate to new slug and refetch will happen automatically via route change
      await router.replace(`/admin/product/${newSlug}`);
    } else {
      // No slug change, just refetch and close edit mode
      await refetch();
      isEditingProduct.value = false;
    }
  } catch (err) {
    console.error("Failed to edit product:", err);
  }
};

const cancelEditProduct = () => {
  if (product.value) {
    productForm.value = {
      name: product.value.name,
      description: product.value.description,
      category: product.value.category,
    };
  }
  isEditingProduct.value = false;
};

const handleAddImages = async () => {
  if (!product.value || newImages.value.length === 0) return;

  try {
    const formData = new FormData();
    // Reverse images array to compensate for server reversing the order
    const reversedImages = [...newImages.value].reverse();
    reversedImages.forEach((file) => {
      formData.append("images", file);
    });

    await addImageMutation.mutateAsync({
      productId: product.value.id,
      formData,
    });

    newImagePreviews.value.forEach((url) => URL.revokeObjectURL(url));
    newImages.value = [];
    isAddingImage.value = false;
    await refetch();
  } catch (err) {
    console.error("Failed to add images:", err);
  }
};

const handleUpdateImage = async (imageId: number) => {
  if (!product.value || !updateImageFile.value) return;

  try {
    const formData = new FormData();
    formData.append("image", updateImageFile.value);

    await updateImageMutation.mutateAsync({
      productId: product.value.id,
      imageId,
      formData,
    });

    if (updateImagePreview.value) {
      URL.revokeObjectURL(updateImagePreview.value);
    }
    updateImageFile.value = null;
    editingImageId.value = null;
  } catch (err) {
    console.error("Failed to update image:", err);
  }
};

const handleDeleteImage = async (imageId: number) => {
  if (!product.value) return;

  try {
    await deleteImageMutation.mutateAsync({
      productId: product.value.id,
      imageId,
    });
    await refetch();
  } catch (err) {
    console.error("Failed to delete image:", err);
  }
};

const onImageFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && product.value) {
    const currentImageCount = product.value.product_images.length;
    const currentNewImagesCount = newImages.value.length;
    const availableSlots =
      MAX_IMAGES - currentImageCount - currentNewImagesCount;

    if (availableSlots <= 0) {
      alert(
        `Maximum ${MAX_IMAGES} images allowed. Please delete some images first.`,
      );
      return;
    }

    const files = Array.from(target.files);
    const filesToAdd = files.slice(0, availableSlots);

    if (files.length > availableSlots) {
      alert(
        `Only ${availableSlots} more image(s) can be added. Selected first ${availableSlots} images.`,
      );
    }

    // APPEND to existing images instead of replacing
    newImages.value = [...newImages.value, ...filesToAdd];

    // Clear the file input so the same file can be selected again
    target.value = "";
  }
};

const onUpdateImageFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    if (updateImagePreview.value) {
      URL.revokeObjectURL(updateImagePreview.value);
    }
    updateImageFile.value = target.files[0];
  }
};

const handleDragOverAdd = (event: DragEvent) => {
  event.preventDefault();
  isDraggingAdd.value = true;
};

const handleDragLeaveAdd = () => {
  isDraggingAdd.value = false;
};

const handleDropAdd = (event: DragEvent) => {
  event.preventDefault();
  isDraggingAdd.value = false;

  const files = event.dataTransfer?.files;
  if (files && product.value) {
    const currentImageCount = product.value.product_images.length;
    const currentNewImagesCount = newImages.value.length;
    const availableSlots =
      MAX_IMAGES - currentImageCount - currentNewImagesCount;

    if (availableSlots <= 0) {
      alert(
        `Maximum ${MAX_IMAGES} images allowed. Please delete some images first.`,
      );
      return;
    }

    // Filter only image files
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );

    const filesToAdd = imageFiles.slice(0, availableSlots);

    if (imageFiles.length > availableSlots) {
      alert(
        `Only ${availableSlots} more image(s) can be added. Selected first ${availableSlots} images.`,
      );
    }

    if (filesToAdd.length > 0) {
      // APPEND to existing images instead of replacing
      newImages.value = [...newImages.value, ...filesToAdd];
    }
  }
};

// Drag and drop handlers for updating image
const handleDragOverUpdate = (event: DragEvent) => {
  event.preventDefault();
  isDraggingUpdate.value = true;
};

const handleDragLeaveUpdate = () => {
  isDraggingUpdate.value = false;
};

const handleDropUpdate = (event: DragEvent) => {
  event.preventDefault();
  isDraggingUpdate.value = false;

  const files = event.dataTransfer?.files;
  if (files && files[0] && files[0].type.startsWith("image/")) {
    // Clean up old preview
    if (updateImagePreview.value) {
      URL.revokeObjectURL(updateImagePreview.value);
    }
    updateImageFile.value = files[0];
  }
};

const removeNewImage = (index: number) => {
  // Clean up the preview URL
  const previewUrl = newImagePreviews.value[index];
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
  newImages.value = newImages.value.filter((_, i) => i !== index);
};

// Helper functions for file input clicks
const clickAddImagesInput = () => {
  document.getElementById("new-images")?.click();
};

const clickUpdateImageInput = () => {
  document.getElementById("update-image")?.click();
};

const cancelAddingImages = () => {
  isAddingImage.value = false;
  newImagePreviews.value.forEach((url) => URL.revokeObjectURL(url));
  newImages.value = [];
};

const closeUpdateImageDialog = () => {
  editingImageId.value = null;
  if (updateImagePreview.value) {
    URL.revokeObjectURL(updateImagePreview.value);
  }
  updateImageFile.value = null;
};

const clearUpdateImagePreview = () => {
  if (updateImagePreview.value) {
    URL.revokeObjectURL(updateImagePreview.value);
  }
  updateImageFile.value = null;
};

// Handle variant operations
const handleAddVariant = async () => {
  if (!product.value) return;

  try {
    await addVariantMutation.mutateAsync({
      productId: product.value.id,
      payload: {
        variants: [
          {
            variant: variantForm.value.variant,
            price: variantForm.value.price,
            stock: variantForm.value.stock,
          },
        ],
      },
    });

    await refetch();
    variantForm.value = { variant: "", price: 0, stock: 0 };
    isAddingVariant.value = false;
  } catch (err) {
    console.error("Failed to add variant:", err);
  }
};

const startEditVariant = (variant: ProductVariantsType) => {
  editVariantForm.value = {
    variant: variant.variant,
    price: variant.price,
    stock: variant.stock,
  };
  editVariantOriginalName.value = variant.variant;
  isEditingVariant.value = true;
};

const handleEditVariant = async () => {
  if (!product.value) return;

  try {
    await editVariantMutation.mutateAsync({
      productId: product.value.id,
      variant: editVariantOriginalName.value,
      payload: {
        name: editVariantForm.value.variant,
        description: editVariantForm.value.price.toString(),
        category: editVariantForm.value.stock.toString(),
      },
    });

    await refetch();
    isEditingVariant.value = false;
    editVariantOriginalName.value = "";
  } catch (err) {
    console.error("Failed to edit variant:", err);
  }
};

const handleDeleteVariant = async (variantName: string) => {
  if (!product.value) return;
  if (!confirm(`Are you sure you want to delete variant "${variantName}"?`))
    return;

  try {
    await deleteVariantMutation.mutateAsync({
      productId: product.value.id,
      variant: variantName,
    });
    await refetch();
  } catch (err) {
    console.error("Failed to delete variant:", err);
  }
};
</script>

<template>
  <section class="p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
        <UiButton variant="outline" size="icon" @click="router.back()">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
        </UiButton>
        <h1 class="text-3xl font-bold">Product Details</h1>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isPending" class="space-y-6">
      <UiSkeleton class="w-full h-96" />
      <UiSkeleton class="w-full h-64" />
    </div>

    <!-- Product Data -->
    <div v-else-if="product" class="space-y-8">
      <!-- Product Images Card -->
      <UiCard>
        <UiCardHeader>
          <div class="flex justify-between items-center">
            <UiCardTitle class="text-2xl">Product Images</UiCardTitle>
            <div class="flex items-center gap-3">
              <span
                v-if="product.product_images.length > 0"
                class="text-sm text-muted-foreground"
              >
                {{ product.product_images.length }} / {{ MAX_IMAGES }} images
              </span>
              <UiButton
                v-if="!isAddingImage"
                variant="outline"
                @click="isAddingImage = true"
                :disabled="product.product_images.length >= MAX_IMAGES"
              >
                <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
                Add Images
              </UiButton>
            </div>
          </div>
        </UiCardHeader>
        <UiCardContent class="space-y-4">
          <!-- Add Image Form -->
          <div
            v-if="isAddingImage"
            class="border-2 border-dashed rounded-lg p-4"
          >
            <div class="space-y-4">
              <!-- Drag and Drop Zone -->
              <div
                @dragover="handleDragOverAdd"
                @dragleave="handleDragLeaveAdd"
                @drop="handleDropAdd"
                :class="[
                  'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
                  isDraggingAdd
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-300 hover:border-gray-400',
                ]"
                @click="clickAddImagesInput"
              >
                <Icon
                  name="lucide:upload-cloud"
                  class="w-12 h-12 mx-auto mb-4 text-muted-foreground"
                />
                <p class="text-sm font-medium mb-1">
                  Drag and drop images here, or click to select
                </p>
                <p class="text-xs text-muted-foreground mb-2">
                  Supports: JPG, PNG, GIF, WEBP
                </p>
                <p class="text-xs text-muted-foreground font-semibold">
                  {{ product.product_images.length + newImages.length }} /
                  {{ MAX_IMAGES }} images
                  <span
                    v-if="MAX_IMAGES - product.product_images.length > 0"
                    class="text-primary"
                  >
                    ({{ MAX_IMAGES - product.product_images.length }} slots
                    available)
                  </span>
                </p>
                <input
                  id="new-images"
                  type="file"
                  multiple
                  accept="image/*"
                  @change="onImageFileChange"
                  class="hidden"
                />
              </div>

              <!-- Image Previews -->
              <div
                v-if="newImages.length > 0"
                class="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div
                  v-for="(preview, index) in newImagePreviews"
                  :key="index"
                  class="relative group"
                >
                  <img
                    :src="preview"
                    :alt="`Preview ${index + 1}`"
                    class="w-full aspect-square object-center object-contain rounded-lg"
                  />
                  <button
                    @click="removeNewImage(index)"
                    class="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X class="w-4 h-4" />
                  </button>
                  <div
                    class="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded"
                  >
                    {{ newImages[index]?.name }}
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <UiButton
                  variant="outline"
                  :disabled="addImageMutation.isPending.value"
                  @click="cancelAddingImages"
                >
                  Cancel
                </UiButton>
                <UiButton
                  @click="handleAddImages"
                  :disabled="
                    newImages.length === 0 || addImageMutation.isPending.value
                  "
                >
                  <Icon
                    v-if="addImageMutation.isPending.value"
                    name="lucide:loader-2"
                    class="w-4 h-4 mr-2 animate-spin"
                  />
                  Upload {{ newImages.length }} Image{{
                    newImages.length !== 1 ? "s" : ""
                  }}
                </UiButton>
              </div>
            </div>
          </div>

          <!-- Image Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="image in product.product_images"
              :key="image.id"
              class="relative group bg-secondary rounded-md"
            >
              <NuxtImg
                :src="
                  isLocalImagePath(image.image_path)
                    ? `${API_URL}/${image.image_path}`
                    : image.image_path
                "
                :alt="`Product image ${image.id}`"
                class="w-full aspect-square object-center object-contain rounded-lg"
              />
              <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2"
              >
                <UiButton
                  size="icon"
                  variant="secondary"
                  @click="editingImageId = image.id"
                >
                  <Icon name="lucide:edit" class="w-4 h-4" />
                </UiButton>
                <AdminProductDialogDelete
                  :title="`this image`"
                  @confirm="handleDeleteImage(image.id)"
                >
                  <UiButton
                    size="icon"
                    variant="destructive"
                    :disabled="deleteImageMutation.isPending.value"
                  >
                    <Trash2 class="w-4 h-4" />
                  </UiButton>
                </AdminProductDialogDelete>
              </div>

              <!-- Update Image Dialog -->
              <UiDialog
                :open="editingImageId === image.id"
                @update:open="
                  (val) => {
                    if (!val) closeUpdateImageDialog();
                  }
                "
              >
                <UiDialogContent>
                  <UiDialogHeader>
                    <UiDialogTitle>Update Image</UiDialogTitle>
                  </UiDialogHeader>
                  <div class="space-y-4">
                    <div
                      :class="updateImagePreview && 'grid grid-cols-2 gap-4'"
                    >
                      <!-- Current Image -->
                      <div>
                        <p class="text-sm font-medium mb-2">Current Image</p>
                        <NuxtImg
                          :src="
                            isLocalImagePath(image.image_path)
                              ? `${API_URL}/${image.image_path}`
                              : image.image_path
                          "
                          alt="Current"
                          class="w-full aspect-square object-center object-contain rounded-lg border"
                        />
                      </div>

                      <!-- Preview New Image -->
                      <div v-if="updateImagePreview">
                        <p class="text-sm font-medium mb-2">Preview</p>
                        <div class="relative">
                          <img
                            :src="updateImagePreview"
                            alt="Preview"
                            class="w-full aspect-square object-center object-cover rounded-lg border"
                          />
                          <button
                            @click.stop="clearUpdateImagePreview"
                            class="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-2 size-8 hover:bg-destructive/90 transition-colors cursor-pointer"
                          >
                            <Icon name="lucide:x" class="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Drag and Drop Zone -->
                    <div>
                      <p class="text-sm font-medium mb-2">New Image</p>
                      <div
                        @dragover="handleDragOverUpdate"
                        @dragleave="handleDragLeaveUpdate"
                        @drop="handleDropUpdate"
                        :class="[
                          'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
                          isDraggingUpdate
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-300 hover:border-gray-400',
                        ]"
                        @click="clickUpdateImageInput"
                      >
                        <Icon
                          name="lucide:upload-cloud"
                          class="w-10 h-10 mx-auto mb-3 text-muted-foreground"
                        />
                        <p class="text-sm font-medium mb-1">
                          Drag and drop new image here, or click to select
                        </p>
                        <p class="text-xs text-muted-foreground">
                          Supports: JPG, PNG, GIF, WEBP
                        </p>
                        <input
                          id="update-image"
                          type="file"
                          accept="image/*"
                          @change="onUpdateImageFileChange"
                          class="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <UiDialogFooter>
                    <UiButton variant="outline" @click="closeUpdateImageDialog">
                      Cancel
                    </UiButton>
                    <UiButton
                      @click="handleUpdateImage(image.id)"
                      :disabled="
                        !updateImageFile || updateImageMutation.isPending.value
                      "
                    >
                      <Icon
                        v-if="updateImageMutation.isPending.value"
                        name="lucide:loader-2"
                        class="w-4 h-4 mr-2 animate-spin"
                      />
                      Update
                    </UiButton>
                  </UiDialogFooter>
                </UiDialogContent>
              </UiDialog>
            </div>
          </div>

          <p
            v-if="product.product_images.length === 0"
            class="text-center text-muted-foreground py-8"
          >
            No images uploaded yet
          </p>
        </UiCardContent>
      </UiCard>

      <!-- Product Info Card -->
      <UiCard>
        <UiCardHeader>
          <div class="flex justify-between items-center">
            <UiCardTitle class="text-2xl">Product Information</UiCardTitle>
            <UiButton
              v-if="!isEditingProduct"
              variant="outline"
              @click="isEditingProduct = true"
            >
              <Icon name="lucide:edit" class="w-4 h-4 mr-2" />
              Edit Product
            </UiButton>
            <div v-else class="flex gap-2">
              <UiButton
                variant="outline"
                @click="cancelEditProduct"
                :disabled="editProductMutation.isPending.value"
              >
                Cancel
              </UiButton>
              <UiButton
                @click="handleEditProduct"
                :disabled="editProductMutation.isPending.value"
              >
                <Icon
                  v-if="editProductMutation.isPending.value"
                  name="lucide:loader-2"
                  class="w-4 h-4 mr-2 animate-spin"
                />
                Save
              </UiButton>
            </div>
          </div>
        </UiCardHeader>
        <UiCardContent class="space-y-4">
          <div v-if="!isEditingProduct" class="grid md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-muted-foreground">Product Name</p>
              <p class="text-lg font-semibold">{{ product.name }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Category</p>
              <UiBadge>{{ product.category }}</UiBadge>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Slug</p>
              <p class="text-sm font-mono">{{ product.slug }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Sales & Rating</p>
              <div class="flex gap-4">
                <span class="flex items-center gap-1">
                  <Icon name="lucide:star" class="w-4 h-4 text-yellow-500" />
                  {{ product.star.toFixed(1) }}
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="lucide:shopping-cart" class="w-4 h-4" />
                  {{ product.sold }} sold
                </span>
              </div>
            </div>
            <div class="md:col-span-2">
              <p class="text-sm text-muted-foreground">Description</p>
              <p class="text-base break-all">{{ product.description }}</p>
            </div>
          </div>

          <!-- Edit Form -->
          <div v-else class="space-y-4">
            <div class="space-y-2">
              <UiLabel for="name">Product Name</UiLabel>
              <UiInput
                id="name"
                v-model="productForm.name"
                placeholder="Enter product name"
              />
            </div>
            <div class="space-y-2">
              <UiLabel for="category">Category</UiLabel>
              <UiSelect v-model="productForm.category">
                <UiSelectTrigger>
                  <UiSelectValue placeholder="Select category" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="cat in categories"
                    :key="cat.category"
                    :value="cat.category"
                  >
                    {{ cat.category }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
            <div class="space-y-2">
              <UiLabel for="description">Description</UiLabel>
              <UiTextarea
                id="description"
                v-model="productForm.description"
                placeholder="Enter product description"
                rows="4"
              />
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <!-- Product Variants Card -->
      <UiCard>
        <UiCardHeader>
          <div class="flex justify-between items-center">
            <UiCardTitle class="text-2xl">Product Variants</UiCardTitle>
            <UiButton
              v-if="!isAddingVariant"
              variant="outline"
              @click="isAddingVariant = true"
            >
              <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
              Add Variant
            </UiButton>
          </div>
        </UiCardHeader>
        <UiCardContent class="space-y-4">
          <!-- Add Variant Form -->
          <div
            v-if="isAddingVariant"
            class="border-2 border-dashed rounded-lg p-4"
          >
            <div class="space-y-4">
              <div class="grid md:grid-cols-3 gap-4">
                <div>
                  <UiLabel for="variant-name">Variant Name</UiLabel>
                  <UiInput
                    id="variant-name"
                    v-model="variantForm.variant"
                    placeholder="e.g., Small, Red"
                  />
                </div>
                <div>
                  <UiLabel for="variant-price">Price</UiLabel>
                  <UiInput
                    id="variant-price"
                    v-model.number="variantForm.price"
                    type="number"
                    placeholder="0"
                  />
                </div>
                <div>
                  <UiLabel for="variant-stock">Stock</UiLabel>
                  <UiInput
                    id="variant-stock"
                    v-model.number="variantForm.stock"
                    type="number"
                    placeholder="0"
                  />
                </div>
              </div>
              <div class="flex gap-2">
                <UiButton
                  variant="outline"
                  @click="
                    () => {
                      isAddingVariant = false;
                      variantForm = { variant: '', price: 0, stock: 0 };
                    }
                  "
                >
                  Cancel
                </UiButton>
                <UiButton
                  @click="handleAddVariant"
                  :disabled="
                    !variantForm.variant ||
                    variantForm.price <= 0 ||
                    addVariantMutation.isPending.value
                  "
                >
                  <Icon
                    v-if="addVariantMutation.isPending.value"
                    name="lucide:loader-2"
                    class="w-4 h-4 mr-2 animate-spin"
                  />
                  Add Variant
                </UiButton>
              </div>
            </div>
          </div>

          <!-- Variants Table -->
          <div v-if="product.variant.length > 0" class="border rounded-lg">
            <UiTable>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Variant</UiTableHead>
                  <UiTableHead>Price</UiTableHead>
                  <UiTableHead>Stock</UiTableHead>
                  <UiTableHead class="text-right">Actions</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow
                  v-for="variant in product.variant"
                  :key="variant.id"
                >
                  <UiTableCell class="font-medium">{{
                    variant.variant
                  }}</UiTableCell>
                  <UiTableCell
                    >Rp {{ variant.price.toLocaleString() }}</UiTableCell
                  >
                  <UiTableCell>{{ variant.stock }}</UiTableCell>
                  <UiTableCell class="text-right">
                    <div class="flex justify-end gap-2">
                      <UiButton
                        size="icon"
                        variant="outline"
                        @click="startEditVariant(variant)"
                      >
                        <Icon name="lucide:edit" class="w-4 h-4" />
                      </UiButton>
                      <UiButton
                        size="icon"
                        variant="destructive"
                        @click="handleDeleteVariant(variant.variant)"
                        :disabled="deleteVariantMutation.isPending.value"
                      >
                        <Trash2 class="w-4 h-4" />
                      </UiButton>
                    </div>
                  </UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </div>

          <p v-else class="text-center text-muted-foreground py-8">
            No variants added yet
          </p>
        </UiCardContent>
      </UiCard>

      <!-- Edit Variant Dialog -->
      <UiDialog
        :open="isEditingVariant"
        @update:open="(val) => (isEditingVariant = val)"
      >
        <UiDialogContent>
          <UiDialogHeader>
            <UiDialogTitle>Edit Variant</UiDialogTitle>
          </UiDialogHeader>
          <div class="space-y-4">
            <div>
              <UiLabel for="edit-variant-name">Variant Name</UiLabel>
              <UiInput
                id="edit-variant-name"
                v-model="editVariantForm.variant"
                placeholder="e.g., Small, Red"
              />
            </div>
            <div>
              <UiLabel for="edit-variant-price">Price</UiLabel>
              <UiInput
                id="edit-variant-price"
                v-model.number="editVariantForm.price"
                type="number"
                placeholder="0"
              />
            </div>
            <div>
              <UiLabel for="edit-variant-stock">Stock</UiLabel>
              <UiInput
                id="edit-variant-stock"
                v-model.number="editVariantForm.stock"
                type="number"
                placeholder="0"
              />
            </div>
          </div>
          <UiDialogFooter>
            <UiButton variant="outline" @click="isEditingVariant = false">
              Cancel
            </UiButton>
            <UiButton
              @click="handleEditVariant"
              :disabled="
                !editVariantForm.variant ||
                editVariantForm.price <= 0 ||
                editVariantMutation.isPending.value
              "
            >
              <Icon
                v-if="editVariantMutation.isPending.value"
                name="lucide:loader-2"
                class="w-4 h-4 mr-2 animate-spin"
              />
              Save Changes
            </UiButton>
          </UiDialogFooter>
        </UiDialogContent>
      </UiDialog>

      <!-- Reviews Card -->
      <UiCard>
        <UiCardHeader>
          <UiCardTitle class="text-2xl"
            >Customer Reviews ({{ product.review.length }})</UiCardTitle
          >
        </UiCardHeader>
        <UiCardContent>
          <div v-if="product.review.length > 0" class="space-y-4">
            <div
              v-for="(review, index) in product.review"
              :key="index"
              class="border-b last:border-b-0 pb-4 last:pb-0"
            >
              <div class="flex items-start gap-3">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <p class="font-semibold">{{ review.name }}</p>
                    <div class="flex items-center">
                      <Icon
                        v-for="star in 5"
                        :key="star"
                        name="lucide:star"
                        :class="[
                          'w-4 h-4',
                          star <= review.star
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300',
                        ]"
                      />
                    </div>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    {{ review.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-center text-muted-foreground py-8">
            No reviews yet
          </p>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Error State -->
    <div v-else-if="isError" class="text-center py-12">
      <Icon
        name="lucide:alert-circle"
        class="w-12 h-12 mx-auto text-destructive mb-4"
      />
      <p class="text-lg font-semibold">Failed to load product</p>
      <p class="text-muted-foreground">{{ error?.message }}</p>
    </div>
  </section>
</template>

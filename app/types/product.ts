import z from "zod";

export const ProductVariantSchema = z.object({
  id: z.number(),
  variant: z.string(),
  price: z.number(),
  stock: z.number(),
});

export const ProductReview = z.object({
  name: z.string(),
  star: z.number(),
  description: z.string(),
});

export const ProductSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  price: z.number(),
  product_images: z.string(),
  category: z.string(),
  star: z.number(),
  sold: z.number(),
});

export const ProductImageSchema = z.object({
  id: z.number(),
  image_path: z.string().url(),
});

export const ProductDetailSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  sold: z.number(),
  category: z.string(),
  variant: z.array(ProductVariantSchema),
  product_images: z.array(ProductImageSchema),
  review: z.array(ProductReview),
  star: z.number(),
});

export const ProductReqSchema = z.object({
  name: z.string('This field is required').min(1, "Product name is required"),
  description: z.string('This field is required').min(1, "Description is required").max(190, "Description must be less than 190 characters"),
  category: z.string('This field is required'),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
});

export type ProductType = z.infer<typeof ProductSchema>;
export type ProductDetailType = z.infer<typeof ProductDetailSchema>;
export type ProductVariantsType = z.infer<typeof ProductVariantSchema>;
export type ProductReqType = z.infer<typeof ProductReqSchema>;

import z from "zod";

export const ProductVariantSchema = z.object({
  id: z.number(),
  variant: z.string(),
  stock: z.number(),
  price: z.number(),
});

export const ProductReview = z.object({
  name: z.string(),
  star: z.number(),
  description: z.string(),
});

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  product_images: z.string().url(),
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
  name: z.string(),
  description: z.string(),
  sold: z.number(),
  category: z.string(),
  variant: z.array(ProductVariantSchema),
  product_images: z.array(ProductImageSchema),
  review: z.array(ProductReview),
  star: z.number(),
});

export type ProductType = z.infer<typeof ProductSchema>;
export type ProductDetailType = z.infer<typeof ProductDetailSchema>;
export type ProductVariantsType = z.infer<typeof ProductVariantSchema>;

import z from "zod";

export const ProductVariantSchema = z.object({
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
  product_image: z.string().url(),
  categories: z.string(),
  star: z.number(),
});

export const ProductDetailSchema = ProductSchema.extend({
  description: z.string(),
  product_image: z.array(z.string().url()),
  stock: z.number(),
  sold: z.number(),
  variants: z.array(ProductVariantSchema),
  reviews: z.array(ProductReview),
});

export type ProductType = z.infer<typeof ProductSchema>;
export type ProductDetailType = z.infer<typeof ProductDetailSchema>;
export type ProductVariantsType = z.infer<typeof ProductVariantSchema>;

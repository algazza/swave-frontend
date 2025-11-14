import z from "zod";

const ProductVariants = z.object({
  variant: z.string(),
  stock: z.number(),
  price: z.number(),
});

const ProductReview = z.object({
  name: z.string(),
  star: z.number(),
  description: z.string(),
});

export const ProductSchema = z.object({
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
  variants: z.array(ProductVariants),
  reviews: z.array(ProductReview),
});


export type ProductType = z.infer<typeof ProductSchema>;
export type ProductDetailType = z.infer<typeof ProductDetailSchema>;

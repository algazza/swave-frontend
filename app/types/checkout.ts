import z from "zod";
import { ProductSchema } from "./product";

export const CheckoutSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  price: z.number(),
  variant: z.string(),
  product: ProductSchema.omit({ star: true, price: true }),
});

export type CheckoutType = z.infer<typeof CheckoutSchema>;

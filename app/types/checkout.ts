import z from "zod";
import { ProductSchema } from "./product";

export const CheckoutSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  total_price: z.number(),
  variant: z.string(),
  product: ProductSchema.omit({ star: true }),
});

export type CheckoutType = z.infer<typeof CheckoutSchema>;

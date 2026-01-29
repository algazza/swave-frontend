import z from "zod";

export const CartItemRequest = z.object({
  id: z.number(),
  quantity: z.number(),
  price: z.number(),
  product_id: z.number(),
  variant_id: z.number(),
});

export const AddCartRequest = z.object({
  quantity: z.number(),
  variant_id: z.number(),
  product_id: z.number(),
});

export type AddCartRequestType = z.infer<typeof AddCartRequest>;

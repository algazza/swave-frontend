import z from "zod";

export const variantSchema = z.object({
  variants: z.array(
    z.object({
      variant: z.string().min(2).max(100),
      price: z.number().positive(),
      stock: z.number().min(0),
    }),
  ),
});

export type VariantsType = z.infer<typeof variantSchema>;
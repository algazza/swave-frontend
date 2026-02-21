import z from "zod";

export const singleVariantSchema = z.object({
  variant: z
    .string()
    .min(2, "Variant name must be at least 2 characters")
    .max(100, "Variant name must be less than 100 characters"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
});

export const variantSchema = z.object({
  variants: z.array(singleVariantSchema),
});

export type VariantsType = z.infer<typeof variantSchema>;
export type SingleVariantType = z.infer<typeof singleVariantSchema>;

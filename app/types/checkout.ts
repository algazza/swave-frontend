import z from "zod";
import { ProductSchema, ProductVariantSchema } from "./product";

export const DeliverySchema = z.object({
  delivery_type: z.enum(["pickup", "delivery"], "This field is required"),
  pickup_date: z.string().optional(),
  pickup_hour: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{2}:\d{2}$/.test(v), {
      message: "Invalid time format (HH:MM)",
    }),
  address_id: z.number(),
});

export const CheckoutProductIdSchema = z.object({
  quantity: z.number(),
  product_variant_id: z.number(),
  product_id: z.number(),
});

export const ProductCheckoutSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  price: z.number(),
  product: ProductSchema.omit({ star: true, price: true, sold: true }),
  variant: ProductVariantSchema,
});

export const CheckoutSchema = z
  .object({
    description: z.string().optional(),
    gift_card: z.boolean(),
    gift_description: z.string().optional(),
    deliveries: DeliverySchema,
    product_checkout: z.array(CheckoutProductIdSchema),
  })
  .superRefine((val, ctx) => {
    if (
      val.gift_card &&
      (!val.gift_description || val.gift_description.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "This field is required",
        path: ["gift_description"],
      });
    }

    if (val.deliveries.delivery_type === "pickup") {
      if (!val.deliveries.pickup_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "This field is required",
          path: ["deliveries", "pickup_date"],
        });
      }

      if (!val.deliveries.pickup_hour) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "This field is required",
          path: ["deliveries", "pickup_hour"],
        });
      }
    }
  });

export const CheckoutTableSchema = z.object({
  order_id: z.number(),
  name: z.string(),
  status: z.enum(["pending", "processing", "delivery", "cancel", "success"]),
  type: z.enum(["delivery", "pickup"]),
  amount: z.number(),
});

export const ProductHistoryCheckoutSchema = z.object({
  name: z.string(),
  image_path: z.string(),
  category: z.string(),
  variant: z.string(),
  variant_price: z.number(),
  quantity: z.number(),
  total_price: z.number(),
});

export const CheckoutHistoryArray = z.object({
  id: z.number(),
  order_id: z.string(),
  created_at: z.string(),
  status: z.enum(["pending", "processing", "delivery", "cancel", "success"]),
  products: z.array(ProductHistoryCheckoutSchema),
});

export type CheckoutProductType = z.infer<typeof ProductCheckoutSchema>;
export type CheckoutType = z.infer<typeof CheckoutSchema>;
export type CheckoutTableType = z.infer<typeof CheckoutTableSchema>;
export type CheckoutHistoryType = z.infer<typeof CheckoutHistoryArray>;

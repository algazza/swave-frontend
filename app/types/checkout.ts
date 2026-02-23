import z from "zod";
import { ProductSchema, ProductVariantSchema } from "./product";
import { AddressSchema } from "./address";

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
  variant_id: z.number(),
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
    delivery: DeliverySchema,
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

    if (val.delivery.delivery_type === "pickup") {
      if (!val.delivery.pickup_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "This field is required",
          path: ["delivery", "pickup_date"],
        });
      }

      if (!val.delivery.pickup_hour) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "This field is required",
          path: ["delivery", "pickup_hour"],
        });
      }
    }
  });

export const CheckoutTableSchema = z.object({
  created_at: z.string(),
  order_id: z.string(),
  name: z.string(),
  username: z.string(),
  status: z.enum(["pending", "processing", "delivery", "cancel", "success"]),
  delivery: z.enum(["delivery", "pickup"]),
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

export const DeliveryDetailSchema = z.object({
  delivery_type: z.enum(["pickup", "delivery"]),
  pickup_date: z.string().nullable(),
  pickup_hour: z.string().nullable(),
  delivery_price: z.number(),
  address: AddressSchema,
});

export const StatusHistorySchema = z.object({
  order_status: z.enum([
    "pending",
    "processing",
    "delivery",
    "cancel",
    "success",
  ]),
  description: z.string().nullable(),
  created_at: z.string(),
});

export const ProductCheckoutDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  image_path: z.string(),
  category: z.string(),
  variant: z.string(),
  variant_price: z.number(),
  quantity: z.number(),
  total_price: z.number(),
});

export const CheckoutHistoryDetailSchema = z.object({
  order_id: z.string(),
  total_price: z.number(),
  estimation: z.string().nullable(),
  description: z.string().nullable(),
  gift_card: z.boolean(),
  gift_description: z.string().nullable(),
  created_at: z.string(),
  delivery: DeliveryDetailSchema,
  status: z.array(StatusHistorySchema),
  product_checkout: z.array(ProductCheckoutDetailSchema),
});

export const CheckoutDetailAdminSchema = CheckoutHistoryDetailSchema.extend({
  user: z.object({
    username: z.string(),
    name: z.string(),
  }),
});

export const UpdateStatusCheckoutSchema = z
  .object({
    order_status: z.enum([
      "pending",
      "processing",
      "delivery",
      "cancel",
      "success",
    ]),
    description: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (
      val.order_status === "cancel" &&
      (!val.description || val.description.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Description is required when canceling",
        path: ["description"],
      });
    }
  });

export type CheckoutProductType = z.infer<typeof ProductCheckoutSchema>;
export type CheckoutType = z.infer<typeof CheckoutSchema>;
export type CheckoutTableType = z.infer<typeof CheckoutTableSchema>;
export type CheckoutHistoryType = z.infer<typeof CheckoutHistoryArray>;
export type CheckoutHistoryDetailType = z.infer<
  typeof CheckoutHistoryDetailSchema
>;
export type CheckoutDetailAdminType = z.infer<typeof CheckoutDetailAdminSchema>;
export type UpdateStatusCheckoutType = z.infer<
  typeof UpdateStatusCheckoutSchema
>;

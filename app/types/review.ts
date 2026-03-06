import z from "zod";

export const reviewHistory = z.object({
    id: z.number(),
    created_at: z.string(),
    star: z.number().min(1).max(5),
    description: z.string(),
    user: z.object({
        name: z.string(),
    }),
    product: z.object({
        name: z.string(),
        image_path: z.string(),
        category: z.string(),
        variant: z.string(),
    }),
})

export const unreviewHistory = z.object({
    id: z.number(),
    order_id: z.string(),
    created_at: z.string(),
    total_price: z.number(),
    status: z.enum(["pending", "processing", "delivery", "cancel", "success"]),
    product: z.object({
        product_id: z.number(),
        product_name: z.string(),
        product_images: z.string(),
        category: z.string(),
        variant: z.string(),
        price: z.number(),
        quantity: z.number(),
    }),
})

export const addReviewSchema = z.object({
    star: z.number("Star rating is required").min(1, "Star rating must be at least 1").max(5),
    description: z.string("Description field is required").min(10, "Description must be at least 10 characters").max(500),
    order_id: z.string(),
    product_id: z.number(),
});

export type ReviewHistoryType = z.infer<typeof reviewHistory>;
export type UnreviewHistoryType = z.infer<typeof unreviewHistory>;
export type AddReviewType = z.infer<typeof addReviewSchema>;
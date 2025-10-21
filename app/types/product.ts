import z from "zod"

export const ProductSchema = z.object({
    name: z.string(),
    price: z.number(),
    product_image: z.string().url(),
    categories: z.string(),
    review: z.number()
})

export type ProductType = z.infer<typeof ProductSchema>
import z from "zod";

export const CategorySchema = z.object({
    category: z.string(),
    count: z.number(),
})

export const CategoryReqSchema = z.object({
    category: z.string('This field is required').min(1, "Category name is required"),
})

export type CategoryType = z.infer<typeof CategorySchema>;
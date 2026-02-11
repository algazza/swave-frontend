import z from "zod";

export const CategorySchema = z.object({
    category: z.string(),
    count: z.number(),
})

export type CategoryType = z.infer<typeof CategorySchema>;
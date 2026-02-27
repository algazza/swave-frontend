import z from "zod";

export const ContactSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    topic: z.string(),
})

export const CreateContactSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    topic: z.string(),
    description: z.string(),
})

export type ContactType = z.infer<typeof ContactSchema>;
export type CreateContactType = z.infer<typeof CreateContactSchema>;
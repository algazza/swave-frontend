import z from "zod";

export const AddressSchema = z.object({
    recipient: z.string(),
    label: z.string(),
    city: z.string(),
    subdistrict: z.string(),
    zip_code: z.number(),
    address: z.string(),
    main_address: z.boolean()
})

export type AddressType = z.infer<typeof AddressSchema>
import z from "zod";

export const AddressSchema = z.object({
  id: z.number(),
  recipient: z.string(),
  label: z.enum(["Home", "Office", "School", "Apartment"]),
  city: z.string(),
  subdistrict: z.string(),
  zip_code: z.number(),
  address: z.string(),
  main_address: z.boolean(),
  description: z.string().optional(),
});

export const AddAddressSchema = z.object({
  recipient: z.string("This field is required").min(3, "character must be more than 3"),
  label: z.string(
    "This field is required"
  ),
  city: z.string("This field is required"),
  subdistrict: z.string("This field is required"),
  zip_code: z.string("This field is required").regex(/^\d{5}$/, "Must 5 digit"),
  address: z.string("This field is required").min(10, "character must be more than 10"),
  description: z.string().optional(),
  main_address: z.boolean(),
});

export const EditAddressSchema = z.object({
  id: z.number().optional(),
  recipient: z.string().min(3).optional(),
  label: z.enum(
    ["Home", "Office", "School", "Apartment"],
  ).optional(),
  city: z.string().optional(),
  subdistrict: z.string().optional(),
  zip_code: z.string().regex(/^\d{5}$/, "Must 5 digit").optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  main_address: z.boolean().optional(),
});

export type AddressType = z.infer<typeof AddressSchema>;
export type AddAddressType = z.infer<typeof AddAddressSchema>;
export type EditAddressType = z.infer<typeof EditAddressSchema>;

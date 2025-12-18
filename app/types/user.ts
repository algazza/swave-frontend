import z from "zod";

export const AddressSchema = z.object({
  id: z.number(),
  recipient: z.string(),
  label: z.string(),
  city: z.string(),
  subdistrict: z.string(),
  zip_code: z.number(),
  address: z.string(),
  main_address: z.boolean(),
});

export const RegisterSchema = z
  .object({
    name: z.string("This field is required"),
    username: z
      .string("This field is required")
      .min(6, "character must be more than 6")
      .refine((val) => val === val.toLowerCase(), {
        message: "must be lowercase",
      })
      .regex(/^[a-z0-9]+$/, {
        message: "no spaces allowed and ",
      }),
    phone: z.string("This field is required").regex(/^\+62\d+$/, {
      message: "Number begin with +62",
    }),
    password: z
      .string("This field is required")
      .min(6, "character must be more than 6"),
    confirm_password: z
      .string("This field is required")
      .min(6, "character must be more than 6"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords doesn't match",
    path: ["confirm_password"],
  });

export const LoginSchema = RegisterSchema.omit({
  name: true,
  phone: true,
  confirm_password: true,
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  phone: z.string(),
})

export type AddressType = z.infer<typeof AddressSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
export type UserType = z.infer<typeof UserSchema>

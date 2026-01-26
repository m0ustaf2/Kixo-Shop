import * as z from "zod";

export const changeFormSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must be at most 50 characters" })
      .refine(
        (val) => /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(val),
        { message: "Password contains invalid characters" },
      ),
    password: z
      .string()
      .trim()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must be at most 50 characters" })
      .refine(
        (val) => /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(val),
        { message: "Password contains invalid characters" },
      ),
    rePassword: z
      .string()
      .trim()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must be at most 50 characters" })
      .refine(
        (val) => /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(val),
        { message: "Password contains invalid characters" },
      ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.rePassword) {
      ctx.addIssue({
        path: ["rePassword"],
        message: "Passwords do not match",
        code: "custom",
      });
    }
  });

export type ChangePayload = z.infer<typeof changeFormSchema>;

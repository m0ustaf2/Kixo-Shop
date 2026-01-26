import * as z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(50, { message: "Email must be at most 50 characters" })
    .email()
    .refine((val) => /^[^\s'";]+$/.test(val), {
      message: "Email contains invalid characters",
    }),

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
});

export type LoginPayload = z.infer<typeof loginFormSchema>;

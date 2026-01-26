import * as z from "zod";

export const forgotFormSchema = z.object({
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
});
export const verifyFormSchema = z.object({
  resetCode: z
    .string()
    .trim()
    .nonempty({ message: "Code is required" })
    .length(6, { message: "Code must be exactly 6 digits" })
    .regex(/^[0-9]+$/, { message: "Code must contain only numbers" }),
});

export const resetFormSchema = z.object({
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

  newPassword: z
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

export type ForgotPayload = z.infer<typeof forgotFormSchema>;
export type VerifyPayload = z.infer<typeof verifyFormSchema>;
export type ResetPayload = z.infer<typeof resetFormSchema>;

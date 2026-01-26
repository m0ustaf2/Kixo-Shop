import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" })
      .max(50, { message: "Name must be at most 50 characters" })
      .regex(/^[a-zA-Z\s'-]+$/, {
        message:
          "Name can only contain letters, spaces, hyphens, and apostrophes",
      }),

    email: z
      .string()
      .trim()
      .nonempty({ message: "Email is required" })
      .toLowerCase()
      .email({ message: "Please enter a valid email address" }),

    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),

    rePassword: z.string().nonempty({ message: "Password is required" }),

    phone: z
      .string()
      .trim()
      .nonempty({ message: "Phone number is required" })
      .regex(/^(002|\+2)?01[0-25][0-9]{8}$/, {
        message: "Please enter a valid Egyptian phone number",
      }),
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
export type RegisterPayload = z.infer<typeof registerFormSchema>;

export const formState: formStateType = {
  success: false,
  error: {},
  message: null,
};

export type formStateType = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  };
  message: string | null;
};

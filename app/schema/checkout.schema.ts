import { z } from "zod";

export const checkoutFormSchema = z.object({
  cartId: z.string().nonempty({ message: "cartId is required" }),
  details: z
    .string()
    .trim()
    .nonempty({ message: "details is required" })
    .min(3, { message: "Details must be at least 3 characters" }),
  phone: z
    .string()
    .trim()
    .nonempty({ message: "Phone number is required" })
    .regex(/^(002|\+2)?01[0-25][0-9]{8}$/, {
      message: "Please enter a valid Egyptian phone number",
    }),
  city: z
    .string()
    .trim()
    .nonempty({ message: "City is required" })
    .min(3, { message: "City must be at least 3 characters" }),
  paymentMethod: z.enum(["card", "cash"], {
    message: "Payment method is required",
  }),
});
export type CheckoutFormType = z.infer<typeof checkoutFormSchema>;

export const checkoutFormState: checkoutFormStateType = {
  success: false,
  error: {},
  message: null,
};

export type checkoutFormStateType = {
  success: boolean;
  error: {
    cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?: string[];
  };
  message: string | null;
  callbackUrl?: string;
  paymentMethod?: string;
};

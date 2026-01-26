"use server";
import { getUserId, getUserToken } from "@/lib/server-utils";
import {
  checkoutFormSchema,
  checkoutFormStateType,
} from "../schema/checkout.schema";

export async function handelPayment(
  state: checkoutFormStateType,
  formData: FormData,
): Promise<checkoutFormStateType> {
  const shippingAddress = {
    details: formData.get("details"),
    city: formData.get("city"),
    phone: formData.get("phone"),
  };
  const cartId = formData.get("cartId") as string;
  const paymentMethod = formData.get("paymentMethod") as string;
  const parsedData = checkoutFormSchema.safeParse({
    ...shippingAddress,
    cartId,
    paymentMethod,
  });
  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
    };
  }
  const token = await getUserToken();

  const endPoint =
    paymentMethod === "cash"
      ? `api/v1/orders/${cartId}`
      : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/${endPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(shippingAddress),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "Failed to place order",
        callbackUrl: "/cart",
        paymentMethod,
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Order placed successfully",
      callbackUrl: paymentMethod === "cash" ? "/allorders" : data.session.url,
      paymentMethod,
    };
  } catch (error) {
    return {
      success: false,
      error: {},
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
export async function getUserOrders() {
  const userId = await getUserId();

  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/orders/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Failed to fetch user orders",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Fetch user orders successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}

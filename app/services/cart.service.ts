"use server";

import { getUserToken } from "@/lib/server-utils";

export async function getUserCart() {
  const token = await getUserToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      headers: {
        token: token as string,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Failed to fetch cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Fetch cart successful",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}
export async function removeUserCart() {
  const token = await getUserToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Failed to remove cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Remove cart successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}
export async function addToCart(productId: string) {
  const token = await getUserToken();
  try {
    if (!token) {
      return {
        data: null,
        success: false,
        message: "Please login to add to cart",
      };
    }
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Failed to add cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Added to cart successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}
export async function removeItemFromCart(productId: string) {
  const token = await getUserToken();
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Failed to remove cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Removed from cart successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}
export async function updateQtyProductCart(productId: string, count: number) {
  const token = await getUserToken();
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ count }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Failed to update quantity cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Updated quantity in cart successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}

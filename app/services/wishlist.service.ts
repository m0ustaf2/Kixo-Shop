"use server";
import { getUserToken } from "@/lib/server-utils";

const BASE_URL = process.env.API_BASE_URL;

export async function addToWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) {
    return {
      data: null,
      success: false,
      message: "Please login to add items to wishlist",
    };
  }
  try {
    const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });

    const data = await res.json();

    if (!res.ok || data.status !== "success") {
      return {
        data: null,
        success: false,
        message: data.message || "Failed to add to wishlist",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "Added to wishlist successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
}

export async function removeFromWishlist(productId: string) {
  const token = await getUserToken();

  if (!token) {
    return {
      data: null,
      success: false,
      message: "Please login to remove items from wishlist",
    };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });

    const data = await res.json();

    if (!res.ok || data.status !== "success") {
      return {
        data: null,
        success: false,
        message: data.message || "Failed to remove from wishlist",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "Removed from wishlist successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
}

export async function getUserWishlist() {
  const token = await getUserToken();

  if (!token) {
    return {
      data: null,
      success: false,
      message: "Please login to view wishlist",
    };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
      method: "GET",
      headers: {
        token: token as string,
      },
    });

    const data = await res.json();

    if (!res.ok || data.status !== "success") {
      return {
        data: null,
        success: false,
        message: data.message || "Failed to fetch wishlist",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "Wishlist fetched successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
}

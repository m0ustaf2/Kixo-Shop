"use server";

import { getUserToken } from "@/lib/server-utils";

export async function changePassword(
  currentPassword: string,
  password: string,
  rePassword: string,
) {
  const token = await getUserToken();
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ currentPassword, password, rePassword }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Failed to send reset email",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Reset email sent successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}

"use server";
export async function forgotPassword(email: string) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
export async function verifyCode(resetCode: string) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetCode }),
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
export async function resetPassword(email: string, newPassword: string) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
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

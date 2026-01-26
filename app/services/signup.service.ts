"use server";

import { formStateType, registerFormSchema } from "../schema/register.schema";

export async function handelRegister(
  prevState: formStateType,
  formData: FormData,
): Promise<formStateType> {
  const formValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    rePassword: String(formData.get("rePassword") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  };

  const parsedData = registerFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message ?? "Something went wrong",
        error: {},
      };
    }

    return {
      success: true,
      message: data?.message ?? "Registered successfully",
      error: {},
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Network error",
      error: {},
    };
  }
}

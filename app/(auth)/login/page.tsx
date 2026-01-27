"use client";

import ErrorTollTip from "@/app/components/shared/ErrorTollTip";
import FromHeader from "@/app/components/shared/FromHeader";
import SubmitBtn from "@/app/components/shared/SubmitBtn";
import { loginFormSchema, LoginPayload } from "@/app/schema/login.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const getFieldError = (name: keyof LoginPayload) => {
    return form.formState.errors[name]?.message;
  };

  const isFieldValid = (name: keyof LoginPayload) =>
    form.formState.dirtyFields[name] && !form.formState.errors[name];

  async function onSubmit(values: LoginPayload) {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.ok) {
        toast.success("Login successful", { position: "top-center" });
        router.push("/");
      } else {
        toast.error(res?.error || "Something went wrong", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error((error as string) || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="relative w-full max-w-lg rounded-3xl shadow-2xl dark:shadow-gray-900/50 border border-white/20 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
        <div className="overflow-hidden">
          {/* Header */}
          <FromHeader
            Header={"Welcome Back"}
            subHeader={"Sign in to your account"}
            icon={<Lock className="w-8 h-8 text-white" />}
          />
        </div>

        {/* Form */}
        <div className="p-8">
          <Form {...form}>
            <div className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  const error = getFieldError("email");
                  const isValid = isFieldValid("email");
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            {...field}
                            type="email"
                            placeholder="you@example.com"
                            className={`px-4 py-3.5 rounded-xl border-2 transition-all duration-200 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 ${
                              error
                                ? "border-red-500 bg-red-50 dark:bg-red-950/30 dark:border-red-600 animate-shake pr-10"
                                : isValid
                                  ? "border-green-500 bg-green-50 dark:bg-green-950/30 dark:border-green-600 pr-10"
                                  : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 focus:border-purple-500 dark:focus:border-purple-500 focus:bg-purple-50/30 dark:focus:bg-purple-950/20"
                            }`}
                          />

                          {/* Error Tooltip */}
                          {error && <ErrorTollTip message={error} />}

                          {/* Success Icon */}
                          {isValid && (
                            <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 dark:text-green-400 z-10" />
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  const error = getFieldError("password");
                  const isValid = isFieldValid("password");
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className={`px-4 py-3.5 pr-24 rounded-xl border-2 transition-all duration-200 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 ${
                              error
                                ? "border-red-500 bg-red-50 dark:bg-red-950/30 dark:border-red-600 animate-shake"
                                : isValid
                                  ? "border-green-500 bg-green-50 dark:bg-green-950/30 dark:border-green-600"
                                  : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 focus:border-purple-500 dark:focus:border-purple-500 focus:bg-purple-50/30 dark:focus:bg-purple-950/20"
                            }`}
                          />

                          {/* Toggle Password */}
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1 z-10"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>

                          {/* Error Tooltip */}
                          {error && <ErrorTollTip message={error} />}

                          {/* Success Icon */}
                          {isValid && (
                            <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 dark:text-green-400 z-10" />
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  href="/forgotpassword"
                  className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium hover:underline transition-all"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <SubmitBtn
                action={form.handleSubmit(onSubmit)}
                isLoading={isLoading}
                title="Sign In"
                titleLoading="Signing in..."
              />

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold hover:underline transition-all"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

"use client";

import ErrorTollTip from "@/app/components/shared/ErrorTollTip";
import FromHeader from "@/app/components/shared/FromHeader";
import SubmitBtn from "@/app/components/shared/SubmitBtn";
import { resetFormSchema, ResetPayload } from "@/app/schema/forgot.schema";
import { resetPassword } from "@/app/services/auth.service";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdatePage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPayload>({
    resolver: zodResolver(resetFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  const getFieldError = (name: keyof ResetPayload) => {
    return form.formState.errors[name]?.message;
  };

  const isFieldValid = (name: keyof ResetPayload) =>
    form.formState.dirtyFields[name] && !form.formState.errors[name];

  async function onSubmit(values: ResetPayload) {
    try {
      setIsLoading(true);
      const res = await resetPassword(values.email, values.newPassword);

      if (res?.success) {
        toast.success(
          res?.message || "Changed successfully , You will be logged out",
          {
            position: "top-center",
          },
        );
        form.reset();
        router.push("/login");
      } else {
        toast.error(res?.message || "Something went wrong", {
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
    <div className="flex items-center justify-center p-4 py-8">
      {/* Main Card */}
      <div className="relative w-full max-w-lg">
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl dark:shadow-gray-900/50 border border-white/20 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <FromHeader
            icon={<Lock className="w-8 h-8" />}
            Header="Change Password"
            subHeader="Enter your current password and new password"
          />

          {/* Form */}
          <div className="p-8">
            <Form {...form}>
              <div className="space-y-5">
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

                            {error && <ErrorTollTip message={error} />}

                            {isValid && (
                              <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 dark:text-green-400 z-10" />
                            )}
                          </div>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                {/* New Password Field */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => {
                    const error = getFieldError("newPassword");
                    const isValid = isFieldValid("newPassword");
                    return (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              {...field}
                              value={field.value || ""}
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

                            {error && <ErrorTollTip message={error} />}

                            {isValid && (
                              <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 dark:text-green-400 z-10" />
                            )}
                          </div>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                {/* Submit Button */}
                <SubmitBtn
                  isLoading={isLoading}
                  title="Reset Password"
                  titleLoading="Changing Password..."
                  action={form.handleSubmit(onSubmit)}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

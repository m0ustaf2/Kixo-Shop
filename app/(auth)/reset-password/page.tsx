"use client";

import ErrorTollTip from "@/app/components/shared/ErrorTollTip";
import FromHeader from "@/app/components/shared/FromHeader";
import SubmitBtn from "@/app/components/shared/SubmitBtn";
import { changeFormSchema, ChangePayload } from "@/app/schema/change.schema";
import { changePassword } from "@/app/services/change.service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdatePage() {
  const router = useRouter();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChangePayload>({
    resolver: zodResolver(changeFormSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const getFieldError = (name: keyof ChangePayload) => {
    return form.formState.errors[name]?.message;
  };

  const isFieldValid = (name: keyof ChangePayload) =>
    form.formState.dirtyFields[name] && !form.formState.errors[name];

  async function onSubmit(values: ChangePayload) {
    try {
      setIsLoading(true);
      const res = await changePassword(
        values.currentPassword,
        values.password,
        values.rePassword,
      );

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
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
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
                {/* Current Password Field */}
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => {
                    const error = getFieldError("currentPassword");
                    const isValid = isFieldValid("currentPassword");
                    return (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Lock className="w-4 h-4 text-purple-600" />
                          Current Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              {...field}
                              value={field.value || ""}
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className={`px-4 py-3.5 pr-24 rounded-xl border-2 transition-all duration-200 ${
                                error
                                  ? "border-red-500 bg-red-50 animate-shake"
                                  : isValid
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:bg-purple-50/30"
                              }`}
                            />

                            <button
                              type="button"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors p-1 z-10"
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>

                            {error && <ErrorTollTip message={error} />}

                            {isValid && (
                              <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 z-10" />
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
                  name="password"
                  render={({ field }) => {
                    const error = getFieldError("password");
                    const isValid = isFieldValid("password");
                    return (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Lock className="w-4 h-4 text-purple-600" />
                          New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              {...field}
                              value={field.value || ""}
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className={`px-4 py-3.5 pr-24 rounded-xl border-2 transition-all duration-200 ${
                                error
                                  ? "border-red-500 bg-red-50 animate-shake"
                                  : isValid
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:bg-purple-50/30"
                              }`}
                            />

                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors p-1 z-10"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>

                            {error && <ErrorTollTip message={error} />}

                            {isValid && (
                              <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 z-10" />
                            )}
                          </div>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="rePassword"
                  render={({ field }) => {
                    const error = getFieldError("rePassword");
                    const isValid = isFieldValid("rePassword");
                    return (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Lock className="w-4 h-4 text-purple-600" />
                          Confirm New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              {...field}
                              value={field.value || ""}
                              type={showRePassword ? "text" : "password"}
                              placeholder="••••••••"
                              className={`px-4 py-3.5 pr-24 rounded-xl border-2 transition-all duration-200 ${
                                error
                                  ? "border-red-500 bg-red-50 animate-shake"
                                  : isValid
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:bg-purple-50/30"
                              }`}
                            />

                            <button
                              type="button"
                              onClick={() => setShowRePassword(!showRePassword)}
                              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors p-1 z-10"
                            >
                              {showRePassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>

                            {error && <ErrorTollTip message={error} />}

                            {isValid && (
                              <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 z-10" />
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
                  title="Change Password"
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

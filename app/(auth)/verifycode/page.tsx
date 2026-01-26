"use client";

import ErrorTollTip from "@/app/components/shared/ErrorTollTip";
import FromHeader from "@/app/components/shared/FromHeader";
import SubmitBtn from "@/app/components/shared/SubmitBtn";
import { verifyFormSchema, VerifyPayload } from "@/app/schema/forgot.schema";
import { verifyCode } from "@/app/services/auth.service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function VerifyCodePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VerifyPayload>({
    resolver: zodResolver(verifyFormSchema),
    mode: "onChange",
    defaultValues: {
      resetCode: "",
    },
  });

  const getFieldError = (name: keyof VerifyPayload) => {
    return form.formState.errors[name]?.message;
  };

  const isFieldValid = (name: keyof VerifyPayload) =>
    form.formState.dirtyFields[name] && !form.formState.errors[name];

  async function onSubmit(values: VerifyPayload) {
    try {
      setIsLoading(true);
      const res = await verifyCode(values.resetCode);
      if (res?.success) {
        toast.success(res?.message || "Sent successfully", {
          position: "top-center",
        });
        router.push("/reset-password ");
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
    <div className="flex items-center justify-center my-5 p-4">
      {/* Main Card */}
      <div className="relative w-full max-w-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="overflow-hidden">
          {/* Header */}
          <FromHeader
            icon={<Lock className="w-8 h-8" />}
            Header={"Verify Code"}
            subHeader={"Enter the code sent to your email"}
          />
        </div>

        {/* Form */}
        <div className="p-8">
          <Form {...form}>
            <div className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => {
                  const error = getFieldError("resetCode");
                  const isValid = isFieldValid("resetCode");
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-600" />
                        Reset Code
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter your reset code"
                            className={`px-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                              error
                                ? "border-red-500 bg-red-50 animate-shake pr-10"
                                : isValid
                                  ? "border-green-500 bg-green-50 pr-10"
                                  : "border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:bg-purple-50/30"
                            }`}
                          />

                          {/* Error Tooltip */}
                          {error && <ErrorTollTip message={error} />}
                          {/* Success Icon */}
                          {isValid && (
                            <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 z-10" />
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
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium hover:underline transition-all"
                >
                  Sent me a new code?
                </Link>
              </div>

              {/* Submit Button */}
              <SubmitBtn
                action={form.handleSubmit(onSubmit)}
                isLoading={isLoading}
                title={"Send Reset Code"}
                titleLoading={"Sending..."}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

"use client";
import ErrorTollTip from "@/app/components/shared/ErrorTollTip";
import FromHeader from "@/app/components/shared/FromHeader";
import SubmitBtn from "@/app/components/shared/SubmitBtn";
import { forgotFormSchema, ForgotPayload } from "@/app/schema/forgot.schema";
import { forgotPassword } from "@/app/services/auth.service";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPayload>({
    resolver: zodResolver(forgotFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const getFieldError = (name: keyof ForgotPayload) => {
    return form.formState.errors[name]?.message;
  };

  const isFieldValid = (name: keyof ForgotPayload) =>
    form.formState.dirtyFields[name] && !form.formState.errors[name];

  async function onSubmit(values: ForgotPayload) {
    try {
      setIsLoading(true);
      const res = await forgotPassword(values.email);
      if (res?.success) {
        toast.success(res?.message || " Email Sent successfully", {
          position: "top-center",
        });
        router.push("/verifycode");
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
      <div className="relative w-full max-w-lg rounded-3xl shadow-2xl dark:shadow-gray-900/50 border border-white/20 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
        <div className="overflow-hidden">
          {/* Header */}
          <FromHeader
            Header="Forgot Password"
            subHeader="Please enter your email to reset your password."
            icon={<Lock className="w-8 h-8" />}
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

              <SubmitBtn
                isLoading={isLoading}
                action={form.handleSubmit(onSubmit)}
                title={"Send Reset Link"}
                titleLoading={"Sending..."}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

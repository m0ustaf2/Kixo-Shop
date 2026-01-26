"use client";
import ErrorTollTip from "@/app/components/shared/ErrorTollTip";
import FromHeader from "@/app/components/shared/FromHeader";
import SubmitBtn from "@/app/components/shared/SubmitBtn";
import {
  formState,
  registerFormSchema,
  RegisterPayload,
} from "@/app/schema/register.schema";
import { handelRegister } from "@/app/services/signup.service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  UserPlus,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [action, formAction] = useActionState(handelRegister, formState);

  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!action) return;

    if (!action.success && action.message) {
      toast.error(action.message, { position: "top-center" });
    }

    if (action.success && action.message) {
      toast.success(action.message, { position: "top-center" });
      router.push("/login");
    }
  }, [action, router]);

  const getFieldError = (name: keyof RegisterPayload) => {
    const clientError = form.formState.errors[name]?.message;

    if (clientError) return clientError;
    if (form.formState.dirtyFields[name]) return undefined;

    return action.error?.[name]?.[0];
  };

  const isFieldValid = (name: keyof RegisterPayload) =>
    form.formState.dirtyFields[name] &&
    !form.formState.errors[name] &&
    !action.error?.[name];

  /* ================= PASSWORD STRENGTH VALIDATION ================= */
  const passwordValue = form.getValues("password");

  const passwordValidations = {
    minLength: passwordValue.length >= 8,
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasLowercase: /[a-z]/.test(passwordValue),
    hasNumber: /[0-9]/.test(passwordValue),
    hasSpecialChar: /[^A-Za-z0-9]/.test(passwordValue),
  };

  const showPasswordStrength = passwordValue.length > 0;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields before showing loading
    const isValid = await form.trigger();

    if (!isValid) {
      toast.error("Please fill in all required fields correctly", {
        position: "top-center",
      });
      return;
    }

    const values = form.getValues();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("rePassword", values.rePassword);
    formData.append("phone", values.phone);

    startTransition(() => {
      formAction(formData);
    });
  };
  /* ================= PASSWORD STRENGTH INDICATOR ================= */
  const PasswordRequirement = ({
    met,
    text,
  }: {
    met: boolean;
    text: string;
  }) => (
    <div
      className={`flex items-center gap-2 text-xs transition-colors ${met ? "text-green-600" : "text-gray-500"}`}
    >
      {met ? (
        <Check className="w-3.5 h-3.5 shrink-0" />
      ) : (
        <X className="w-3.5 h-3.5 shrink-0" />
      )}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center p-4 py-8">
      {/* Main Card */}
      <div className="relative w-full max-w-lg">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <FromHeader
            Header={"Create Account"}
            subHeader={"Join us and start your journey"}
            icon={<UserPlus className="w-8 h-8" />}
          />
          {/* Form */}
          <div className="p-8">
            <Form {...form}>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* NAME */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    const error = getFieldError("name");
                    const isValid = isFieldValid("name");
                    return (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4 text-purple-600" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              {...field}
                              placeholder="John Doe"
                              className={`px-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                                error
                                  ? "border-red-500 bg-red-50 animate-shake pr-10"
                                  : isValid
                                    ? "border-green-500 bg-green-50 pr-10"
                                    : "border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:bg-purple-50/30"
                              }`}
                            />

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

                {/* EMAIL */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    const error = getFieldError("email");
                    const isValid = isFieldValid("email");
                    return (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-600" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              {...field}
                              type="email"
                              placeholder="you@example.com"
                              className={`px-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                                error
                                  ? "border-red-500 bg-red-50 animate-shake pr-10"
                                  : isValid
                                    ? "border-green-500 bg-green-50 pr-10"
                                    : "border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:bg-purple-50/30"
                              }`}
                            />

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

                {/* PHONE */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => {
                    const error = getFieldError("phone");
                    const isValid = isFieldValid("phone");
                    return (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-purple-600" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              {...field}
                              placeholder="+201xxxxxxxxx"
                              className={`px-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                                error
                                  ? "border-red-500 bg-red-50 animate-shake pr-10"
                                  : isValid
                                    ? "border-green-500 bg-green-50 pr-10"
                                    : "border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:bg-purple-50/30"
                              }`}
                            />

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

                {/* PASSWORD */}
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
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              onChange={(e) => {
                                field.onChange(e);
                                form.trigger("password");
                              }}
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

                        {/* Password Strength Indicators */}
                        {showPasswordStrength && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                            <p className="text-xs font-semibold text-gray-700 mb-2">
                              Password must contain:
                            </p>
                            <div className="grid grid-cols-1 gap-1.5">
                              <PasswordRequirement
                                met={passwordValidations.minLength}
                                text="At least 8 characters"
                              />
                              <PasswordRequirement
                                met={passwordValidations.hasUppercase}
                                text="One uppercase letter (A-Z)"
                              />
                              <PasswordRequirement
                                met={passwordValidations.hasLowercase}
                                text="One lowercase letter (a-z)"
                              />
                              <PasswordRequirement
                                met={passwordValidations.hasNumber}
                                text="One number (0-9)"
                              />
                              <PasswordRequirement
                                met={passwordValidations.hasSpecialChar}
                                text="One special character (!@#$...)"
                              />
                            </div>
                          </div>
                        )}
                      </FormItem>
                    );
                  }}
                />

                {/* CONFIRM PASSWORD */}
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
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              {...field}
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
                  isLoading={isPending}
                  title={"Create Account"}
                  titleLoading={"Creating Account..."}
                />
                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?
                  <Link
                    href="/login"
                    className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-all"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

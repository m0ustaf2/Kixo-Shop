"use client";

import { useCart } from "@/app/Context/CartContext";
import {
  checkoutFormSchema,
  checkoutFormState,
  CheckoutFormType,
} from "@/app/schema/checkout.schema";
import { handelPayment } from "@/app/services/order.service";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import clsx from "clsx";

export default function CheckoutPage() {
  const { cartDetails, setCartDetails } = useCart();
  const router = useRouter();

  const [action, formAction, isPending] = useActionState(
    handelPayment,
    checkoutFormState,
  );

  const cartId = cartDetails?.cartId ?? "";

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onBlur",
    defaultValues: {
      cartId,
      details: "",
      city: "",
      phone: "",
      paymentMethod: "cash",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  useEffect(() => {
    if (!action) return;

    if (action.success && action.message) {
      toast.success(action.message, { position: "top-center" });
      setCartDetails(null);

      if (action.paymentMethod === "cash") {
        setTimeout(() => {
          router.push(action.callbackUrl ?? "/allorders");
        }, 3000);
      } else if (action.callbackUrl) {
        window.location.href = action.callbackUrl;
      }
    }

    if (!action.success && action.message) {
      toast.error(action.message, { position: "top-center" });
    }
  }, [action, router, setCartDetails]);

  return (
    <section className="py-10">
      <div className="max-w-xl mx-auto rounded-2xl border bg-background dark:bg-slate-900 p-8 shadow-sm space-y-8">
        {/* Header */}
        <header className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Checkout
          </h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Enter your delivery details to complete your order
          </p>
        </header>

        <Form {...form}>
          <form action={formAction} className="space-y-6">
            {/* hidden cartId */}
            <input type="hidden" name="cartId" value={cartId} />

            {/* Address */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-100">
                    Address Details
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Street, building, floor, apartment"
                      className="dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* City + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-100">City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="City name"
                        className="dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-100">Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="+201xxxxxxxxx"
                        className="dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Payment Method */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-100">
                    Payment Method
                  </FormLabel>

                  <div className="grid grid-cols-2 gap-4">
                    {/* CASH */}
                    <label
                      className={clsx(
                        "relative cursor-pointer rounded-xl border p-4 transition-colors duration-300 ease-in-out",
                        field.value === "cash"
                          ? "border-blue-600 bg-blue-50 shadow-lg dark:bg-blue-900"
                          : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 dark:border-slate-700 dark:hover:border-blue-500 dark:hover:bg-blue-900/30",
                      )}
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value="cash"
                        checked={field.value === "cash"}
                        onChange={field.onChange}
                        className="sr-only"
                      />
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        Cash
                      </p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Pay when order arrives
                      </p>
                    </label>

                    {/* CARD */}
                    <label
                      className={clsx(
                        "relative cursor-pointer rounded-xl border p-4 transition-colors duration-300 ease-in-out",
                        field.value === "card"
                          ? "border-blue-600 bg-blue-50 shadow-lg dark:bg-blue-900"
                          : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 dark:border-slate-700 dark:hover:border-blue-500 dark:hover:bg-blue-900/30",
                      )}
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value="card"
                        checked={field.value === "card"}
                        onChange={field.onChange}
                        className="sr-only"
                      />
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        Card
                      </p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Pay securely online
                      </p>
                    </label>
                  </div>

                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 text-base"
            >
              {isPending
                ? "Processing..."
                : paymentMethod === "cash"
                  ? "Place Order"
                  : "Proceed to Payment"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import RemoveFromCartBtn from "../../components/products/RemoveFromCartBtn";
import { useCart } from "../../Context/CartContext";
import {
  removeItemFromCart,
  removeUserCart,
  updateQtyProductCart,
} from "../../services/cart.service";
import EmptyCartState from "./EmptyCartState";
import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import NavigationButton from "@/app/components/shared/ViewBtn";

export default function CartPage() {
  const { cartDetails, setCartDetails } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  const [loadingActions, setLoadingActions] = useState<{
    [key: string]: "increment" | "decrement" | "remove" | null;
  }>({});

  async function handleRemoveCart() {
    setIsRemoving(true);
    try {
      const res = await removeUserCart();
      if (res.message == "success") {
        toast.success("Cart removed successfully", { position: "top-center" });
        setCartDetails(null);
      } else {
        toast.error("Failed to remove cart");
      }
    } finally {
      setIsRemoving(false);
    }
  }

  async function handelRemoveItem(productId: string) {
    setLoadingActions((prev) => ({ ...prev, [productId]: "remove" }));
    try {
      const res = await removeItemFromCart(productId);
      if (res.success) {
        toast.success(res.message || "Product removed successfully", {
          position: "top-center",
        });
        setCartDetails(res.data);
      } else {
        toast.error(res.message || "Failed to remove product", {
          position: "top-center",
        });
      }
    } finally {
      setLoadingActions((prev) => ({ ...prev, [productId]: null }));
    }
  }

  async function handelUpdateItem(
    productId: string,
    count: number,
    action: "increment" | "decrement",
  ) {
    setLoadingActions((prev) => ({ ...prev, [productId]: action }));
    try {
      const res = await updateQtyProductCart(productId, count);
      if (res.success) {
        toast.success(res.message || "Product updated successfully", {
          position: "top-center",
        });
        setCartDetails(res.data);
      } else {
        toast.error(res.message || "Failed to update product", {
          position: "top-center",
        });
      }
    } finally {
      setLoadingActions((prev) => ({ ...prev, [productId]: null }));
    }
  }
  const totalItems =
    cartDetails?.data?.products.reduce(
      (total, item) => total + item.count,
      0,
    ) || 0;
  return (
    <div className="min-h-screen dark:bg-gray-900 text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {(cartDetails?.data?.products?.length ?? 0) > 0 ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-3">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                <h1 className="text-4xl font-bold">Shopping Cart</h1>
              </div>
              <p className="ml-11 text-muted-foreground">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="space-y-4 lg:col-span-2">
                {cartDetails?.data?.products.map((product) => {
                  const loadingAction = loadingActions[product.product._id];
                  const isDecrementLoading = loadingAction === "decrement";
                  const isIncrementLoading = loadingAction === "increment";
                  const isRemoveLoading = loadingAction === "remove";

                  return (
                    <div
                      key={product._id}
                      className="
                    rounded-2xl border bg-card text-card-foreground
                    p-6 shadow-sm transition-all
                    hover:shadow-md dark:hover:shadow-lg
                  "
                    >
                      <div className="flex gap-6">
                        <div className="shrink-0">
                          <div className="h-32 w-32 overflow-hidden rounded-xl bg-muted border border-border">
                            <Image
                              src={product.product.imageCover}
                              alt={product.product.title}
                              width={128}
                              height={128}
                              className="h-full w-full object-cover"
                              unoptimized
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+fAQADhAGA/e0cyQAAAABJRU5ErkJggg=="
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col">
                          <div className="mb-3 flex items-start justify-between">
                            <div className="flex-1 pr-4">
                              <h3 className="mb-1 line-clamp-2 text-lg font-semibold">
                                {product.product.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                In Stock • Ready to Ship
                              </p>
                            </div>

                            <RemoveFromCartBtn
                              onRemove={() =>
                                handelRemoveItem(product.product._id)
                              }
                              productName={product.product.title}
                              isLoading={isRemoveLoading}
                            />
                          </div>

                          {/* Price & Quantity */}
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-bold">
                                {product.price} EGP
                              </span>
                              <span className="text-sm text-muted-foreground">
                                × {product.count}
                              </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 rounded-xl bg-muted p-1">
                              <Button
                                disabled={
                                  isDecrementLoading ||
                                  isIncrementLoading ||
                                  isRemoveLoading ||
                                  product.count <= 1
                                }
                                onClick={() =>
                                  handelUpdateItem(
                                    product.product._id,
                                    product.count - 1,
                                    "decrement",
                                  )
                                }
                                variant="outline"
                                size="sm"
                              >
                                {isDecrementLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Minus className="h-4 w-4" />
                                )}
                              </Button>

                              <span className="w-12 text-center font-semibold">
                                {product.count}
                              </span>

                              <Button
                                disabled={
                                  isDecrementLoading ||
                                  isIncrementLoading ||
                                  isRemoveLoading
                                }
                                onClick={() =>
                                  handelUpdateItem(
                                    product.product._id,
                                    product.count + 1,
                                    "increment",
                                  )
                                }
                                variant="outline"
                                size="sm"
                              >
                                {isIncrementLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Plus className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Subtotal */}
                          <div className="mt-3 border-t border-border pt-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Subtotal
                              </span>
                              <span className="text-lg font-bold">
                                {product.price * product.count} EGP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Continue Shopping */}
                <NavigationButton
                  title={" Continue Shopping"}
                  href={"/products"}
                />
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 rounded-2xl border bg-card p-6 shadow-lg">
                  <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

                  <div className="mb-6 space-y-4">
                    <div className="flex justify-between border-b border-border py-3">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">
                        {cartDetails?.data?.totalCartPrice} EGP
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-border py-3">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        Free
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-border py-3">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-semibold">
                        {(
                          (cartDetails?.data?.totalCartPrice ?? 0) * 0.14
                        ).toFixed(0)}{" "}
                        EGP
                      </span>
                    </div>

                    <div className="flex justify-between pt-4">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-2xl font-bold">
                        {(
                          (cartDetails?.data?.totalCartPrice ?? 0) * 1.14
                        ).toFixed(0)}{" "}
                        EGP
                      </span>
                    </div>
                  </div>

                  {/* Checkout */}
                  <NavigationButton
                    title={"Proceed to Checkout"}
                    href={"/checkout"}
                  />
                  {/* Security Badge */}
                  <div className="mt-6 rounded-xl border bg-muted p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Secure Checkout</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Your payment information is encrypted and secure
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Clear Cart */}
                  <Button
                    variant="outline"
                    onClick={handleRemoveCart}
                    disabled={isRemoving}
                    className="
                  mt-4 w-full gap-2 rounded-xl
                  border-red-200 text-red-600
                  hover:bg-red-50
                  dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10
                "
                  >
                    {isRemoving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Removing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        Clear Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCartState />
        )}
      </div>
    </div>
  );
}

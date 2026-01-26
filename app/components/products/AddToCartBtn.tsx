"use client";
import { useCart } from "@/app/Context/CartContext";
import { addToCart } from "@/app/services/cart.service";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "sonner";

type AddToCartBtnProps = {
  productId: string;
} & React.ComponentProps<typeof Button>;

export default function AddToCartBtn({
  productId,
  ...props
}: AddToCartBtnProps) {
  const [isPending, startTransition] = useTransition();
  const { getCartDetails } = useCart();
  async function handleAddToCart(productId: string) {
    startTransition(async () => {
      const res = await addToCart(productId);
      if (res.success) {
        toast.success(res.message || "Product added to cart successfully", {
          position: "top-center",
        });
        getCartDetails();
      } else {
        toast.error(res.message || "Failed to add product to cart", {
          position: "top-center",
        });
      }
    });
  }

  return (
    <Button
      {...props}
      disabled={isPending}
      onClick={() => handleAddToCart(productId)}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
}

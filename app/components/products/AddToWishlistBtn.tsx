"use client";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/app/services/wishlist.service";
import { useWishlist } from "@/app/Context/WishlistContext";

interface AddToWishlistBtnProps {
  productId: string;
  productName: string;
  initialWishlisted?: boolean;
}

export default function AddToWishlistBtn({
  productId,
  productName,
  initialWishlisted = false,
}: AddToWishlistBtnProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const [isLoading, setIsLoading] = useState(false);
  const { getWishlistDetails } = useWishlist();

  async function toggleWishlist() {
    setIsLoading(true);
    try {
      let result;

      if (!isWishlisted) {
        result = await addToWishlist(productId);
      } else {
        result = await removeFromWishlist(productId);
      }

      if (result.success) {
        setIsWishlisted(!isWishlisted);
        toast.success(
          !isWishlisted
            ? `${productName} added to wishlist`
            : `${productName} removed from wishlist`,
          { position: "top-center" },
        );

        // Refresh wishlist count in navbar
        await getWishlistDetails();
      } else {
        toast.error(result.message || "Failed to update wishlist", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
      console.error("Wishlist error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={toggleWishlist}
      disabled={isLoading}
      className="absolute top-3 right-3 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`w-5 h-5 transition-all duration-300 ${
          isWishlisted
            ? "fill-red-500 text-red-500 scale-110"
            : "text-gray-600 group-hover:text-red-500"
        } ${isLoading ? "animate-pulse" : ""}`}
      />
    </button>
  );
}

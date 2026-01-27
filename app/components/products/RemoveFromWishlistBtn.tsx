"use client";
import { removeFromWishlist } from "@/app/services/wishlist.service";
import { HeartCrack, Loader2, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RemoveFromWishlistBtnProps {
  productId: string;
  productName: string;
  onRemove?: (productId: string) => void;
}

export default function RemoveFromWishlistBtn({
  productId,
  productName,
  onRemove,
}: RemoveFromWishlistBtnProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  async function handleRemove() {
    setIsRemoving(true);
    try {
      const result = await removeFromWishlist(productId);

      if (result.success) {
        toast.success(`${productName} removed from wishlist`, {
          position: "top-center",
        });
        setShowConfirm(false);
        if (onRemove) {
          onRemove(productId);
        }
      } else {
        toast.error(result.message || "Failed to remove from wishlist", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
      console.error("Remove from wishlist error:", error);
    } finally {
      setIsRemoving(false);
    }
  }

  if (showConfirm) {
    return (
      <div className="absolute bottom-0 right-0 z-10 flex items-center gap-2 animate-in fade-in slide-in-from-right-5 duration-200">
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-lg"
        >
          {isRemoving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Removing...
            </>
          ) : (
            <>
              <HeartCrack className="w-3.5 h-3.5" />
              Confirm
            </>
          )}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isRemoving}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-lg disabled:opacity-50"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="absolute bottom-0 right-0 z-10 my-2 mx-2 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label={`Remove ${productName} from wishlist`}
    >
      <HeartCrack
        className="w-5 h-5 text-red-500
             group-hover:scale-110
             group-hover:rotate-6
             transition-all duration-300"
      />
    </button>
  );
}

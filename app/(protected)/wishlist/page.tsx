"use client";
import RemoveFromWishlistBtn from "@/app/components/products/RemoveFromWishlistBtn";
import { useWishlist } from "@/app/Context/WishlistContext";

import { Button } from "@/components/ui/button";
import { Heart, Loader2, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlistDetails, setWishlistDetails, isLoading } = useWishlist();
  function handleRemoveFromWishlist(productId: string) {
    if (wishlistDetails) {
      setWishlistDetails({
        ...wishlistDetails,
        count: wishlistDetails.count - 1,
        data: wishlistDetails.data.filter((item) => item._id !== productId),
      });
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto text-red-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (!wishlistDetails || wishlistDetails.count === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-linear-to-b from-red-50 to-white">
        <div className="text-center max-w-md px-4">
          <div className="relative mb-6">
            <Heart
              className="w-32 h-32 mx-auto text-gray-300"
              strokeWidth={1}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-16 h-16 text-red-200 animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Save your favorite items here and shop them later!
          </p>
          <Button
            asChild
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg"
          >
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-linear-to-b from-red-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-gray-600">
            {wishlistDetails.count}{" "}
            {wishlistDetails.count === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistDetails.data.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover "
                />
                <RemoveFromWishlistBtn
                  productId={product._id}
                  productName={product.title}
                  onRemove={handleRemoveFromWishlist}
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-12">
                  {product.title}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-red-500">
                    {product.price} EGP
                  </div>

                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700">
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>

                {/* View Product Button */}
                <Button
                  className="w-full bg-red-500 hover:bg-red-600 text-white group/cart"
                  asChild
                >
                  <Link
                    href={`/products/${product._id}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4 group-hover/cart:scale-110 transition-transform" />
                    View Product
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border-2 border-red-100 my-5">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            Wishlist Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Total Items</span>
              <span className="text-2xl font-bold text-red-500">
                {wishlistDetails.count}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Value</span>
              <span className="text-2xl font-bold text-gray-900">
                {wishlistDetails.data
                  .reduce((sum, item) => sum + item.price, 0)
                  .toLocaleString()}{" "}
                EGP
              </span>
            </div>
          </div>
          <Button
            asChild
            className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-6 text-lg"
          >
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

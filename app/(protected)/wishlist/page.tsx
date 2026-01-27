"use client";
import RemoveFromWishlistBtn from "@/app/components/products/RemoveFromWishlistBtn";
import NavigationButton from "@/app/components/shared/ViewBtn";
import { useWishlist } from "@/app/Context/WishlistContext";

import { Heart, Loader2, Star } from "lucide-react";
import Image from "next/image";

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
      <div className="min-h-[60vh] dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto text-red-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (!wishlistDetails || wishlistDetails.count === 0) {
    return (
      <div className="min-h-[60vh] dark:bg-gray-900 flex items-center justify-center">
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
          <div className="w-min sm:max-w-3xs mx-auto mb-4">
            <NavigationButton href={"/products"} title={"Explore Products"} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            <h1 className="text-4xl font-bold">My Wishlist</h1>
          </div>

          <p className="text-muted-foreground">
            {wishlistDetails.count}{" "}
            {wishlistDetails.count === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistDetails.data.map((product) => (
            <div
              key={product._id}
              className="
             overflow-hidden rounded-2xl border
            bg-card text-card-foreground
            shadow-sm transition-all duration-300
            hover:shadow-xl dark:hover:shadow-2xl
          "
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  unoptimized
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+fAQADhAGA/e0cyQAAAABJRU5ErkJggg=="
                />

                <RemoveFromWishlistBtn
                  productId={product._id}
                  productName={product.title}
                  onRemove={handleRemoveFromWishlist}
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="min-h-12 line-clamp-2 font-semibold">
                  {product.title}
                </h3>

                <div className="mb-4 flex items-center justify-between">
                  <div className="text-2xl font-bold text-red-500 dark:text-red-400">
                    {product.price} EGP
                  </div>

                  <div
                    className="
                  flex items-center gap-1 rounded-full px-2 py-1
                  bg-yellow-50
                  dark:bg-yellow-400/10
                "
                  >
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-foreground">
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>

                <NavigationButton
                  title={"View Product"}
                  href={`/products/${product._id}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div
          className="
        mx-auto my-5 mt-12 max-w-md rounded-2xl border
        bg-card text-card-foreground
        p-8 shadow-lg
      "
        >
          <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            Wishlist Summary
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="text-muted-foreground">Total Items</span>
              <span className="text-2xl font-bold text-red-500 ">
                {wishlistDetails.count}
              </span>
            </div>

            <div className="flex items-center justify-between mb-5">
              <span className="text-muted-foreground">Total Value</span>
              <span className="text-2xl font-bold">
                {wishlistDetails.data
                  .reduce((sum, item) => sum + item.price, 0)
                  .toLocaleString()}{" "}
                EGP
              </span>
            </div>
          </div>

          <NavigationButton href={`/products`} title="Continue Shopping" />
        </div>
      </div>
    </section>
  );
}

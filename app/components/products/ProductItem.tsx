"use client";
import { IProduct } from "@/app/interfaces/products.interface";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import AddToWishlistBtn from "./AddToWishlistBtn";

export default function ProductItem({ product }: { product: IProduct }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPrice = product.priceAfterDiscount ?? product.price;
  const hasDiscount = discountPrice < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(((product.price - discountPrice) / product.price) * 100)
    : 0;
  const savings = hasDiscount ? product.price - discountPrice : 0;

  return (
    <div>
      <div className="relative group bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-2xl mb-4">
        {/* Skeleton Shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 z-20">
            <div className="h-[15.625rem] w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
          </div>
        )}

        {/* Wishlist Button - always visible */}
        <div className={imageLoaded ? "opacity-100" : "opacity-50"}>
          <AddToWishlistBtn
            productId={product._id}
            productName={product.title}
            initialWishlisted={false}
          />
        </div>

        {/* Discount Badge */}
        {hasDiscount && imageLoaded && (
          <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            -{discountPercentage}% (Save {savings} EGP)
          </div>
        )}

        <Link
          href={`/products/${product._id}`}
          className="overflow-hidden cursor-pointer block relative"
        >
          <Image
            src={product.imageCover}
            width={270}
            height={250}
            alt={product.title}
            loading="lazy"
            className={`h-[15.625rem] object-contain group-hover:scale-110 transition-all duration-300 ease-in-out ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </Link>

        {/* Add to Cart Button */}
        {imageLoaded && (
          <AddToCartBtn
            variant={"destructive"}
            className="w-full cursor-pointer absolute bottom-0 dark:bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-t-none"
            productId={product._id}
          />
        )}
      </div>

      {/* Product Info */}
      <Link
        href={`/products/${product._id}`}
        className="font-medium mb-2 line-clamp-1 block hover:text-red-500 transition-colors dark:text-gray-100"
      >
        {product.title}
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {hasDiscount ? (
            <>
              <span className="text-xl font-bold text-red-500">
                {product.priceAfterDiscount} EGP
              </span>
              <span className="text-sm text-gray-400 line-through font-medium">
                {product.price} EGP
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-red-500">
              {product.price} EGP
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.ratingsAverage ?? 0)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 fill-gray-300 dark:text-gray-600 dark:fill-gray-600"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium ml-1">
            {product.ratingsAverage}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            ({product.ratingsQuantity})
          </span>
        </div>
      </div>
    </div>
  );
}

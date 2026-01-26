import { IProduct } from "@/app/interfaces/products.interface";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import AddToWishlistBtn from "./AddToWishlistBtn";

export default function ProductItem({ product }: { product: IProduct }) {
  const discountPrice = product.priceAfterDiscount ?? product.price;
  const hasDiscount = discountPrice < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(((product.price - discountPrice) / product.price) * 100)
    : 0;
  const savings = hasDiscount ? product.price - discountPrice : 0;
  return (
    <div>
      <div className="relative group bg-gray-100 overflow-hidden rounded-2xl mb-4">
        {/* Wishlist Button */}
        <AddToWishlistBtn
          productId={product._id}
          productName={product.title}
          initialWishlisted={false}
        />

        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10 bg-linear-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            -{discountPercentage}% (Save {savings} EGP)
          </div>
        )}
        <Link
          href={`/products/${product._id}`}
          className="overflow-hidden cursor-pointer block"
        >
          <Image
            src={product.imageCover}
            width={270}
            height={250}
            alt={product.title}
            loading="lazy"
            className="w-full h-[15.625rem] object-contain group-hover:scale-110 transition-transform duration-300 ease-in-out"
          />
        </Link>

        {/* Add to Cart Button */}
        <AddToCartBtn
          variant={"destructive"}
          className="w-full cursor-pointer absolute bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-t-none"
          productId={product._id}
        />
      </div>

      <Link
        href={`/products/${product._id}`}
        className="font-medium mb-2 line-clamp-1 block hover:text-red-500 transition-colors"
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
            <span className="text-xl font-bold text-gray-900">
              {product.price} EGP
            </span>
          )}
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.ratingsAverage)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 fill-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 font-medium">
            {product.ratingsAverage}
          </span>
          <span className="text-xs text-gray-400">
            ({product.ratingsQuantity})
          </span>
        </div>
      </div>
    </div>
  );
}

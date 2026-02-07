"use client";
import { IBrand } from "@/app/interfaces/brand.interface";
import NavigationButton from "@/app/components/shared/ViewBtn";
import Image from "next/image";
import { useState } from "react";

export default function BrandCardClient({ brand }: { brand: IBrand }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="
        group overflow-hidden rounded-2xl border
        bg-card text-card-foreground
        shadow-sm transition-all duration-300
        hover:shadow-xl
        dark:hover:shadow-2xl
      "
    >
      {/* Brand Image */}
      <div
        className="
          relative aspect-square flex items-center justify-center p-8
          bg-muted
        "
      >
        {/* Skeleton Shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse"></div>
          </div>
        )}

        {/* Actual Image */}
        <div
          className={`transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={brand?.image}
            alt={brand?.name}
            width={500}
            height={500}
            unoptimized
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+fAQADhAGA/e0cyQAAAABJRU5ErkJggg=="
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Hover Overlay */}
        <div
          className="
            absolute inset-0 transition-all duration-300
            bg-gradient-to-br
            from-blue-500/0 to-purple-500/0
            group-hover:from-blue-500/10
            group-hover:to-purple-500/10
            dark:group-hover:from-blue-400/10
            dark:group-hover:to-purple-400/10
          "
        />
      </div>

      {/* Brand Title */}
      <div className="border-t border-border p-4">
        <h3
          className="
            text-center text-lg font-semibold
            text-red-500 
          "
        >
          {brand?.name}
        </h3>
        <NavigationButton
          href={`/brands/${brand?._id}`}
          title="Explore All Brand Products"
        />
      </div>
    </div>
  );
}

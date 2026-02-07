"use client";
import { ICategory } from "@/app/interfaces/categories.interface";
import NavigationButton from "@/app/components/shared/ViewBtn";
import Image from "next/image";
import { useState } from "react";

export default function CategoryCardClient({
  category,
}: {
  category: ICategory;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">
      <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden flex items-center justify-center p-8">
        {!imageLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
            <div className="w-full h-[15.625rem] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse"></div>
          </div>
        )}

        {/* Actual Image */}
        <div
          className={`transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={category?.image}
            alt={category?.name || category?.slug}
            width={270}
            height={250}
            className="w-full h-[15.625rem] object-contain bg-gray-100 dark:bg-gray-800 mb-4"
            unoptimized
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+fAQADhAGA/e0cyQAAAABJRU5ErkJggg=="
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 dark:group-hover:from-blue-500/10 dark:group-hover:to-purple-500/10 transition-all duration-300"></div>
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-center text-lg mb-3">
          {category.name}
        </h3>
        <NavigationButton
          href={`/categories/${category?._id}/subcategories`}
          title="View Sub Categories"
        />
      </div>
    </div>
  );
}

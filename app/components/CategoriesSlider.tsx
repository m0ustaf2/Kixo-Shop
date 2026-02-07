"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ICategory } from "../interfaces/categories.interface";
import Image from "next/image";

export default function CategoriesSlider({
  categories,
}: {
  categories: ICategory[];
}) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const SwiperOptions = {
    slidesPerView: 1,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1600: {
        slidesPerView: 6,
        spaceBetween: 30,
      },
    },
    pagination: {
      clickable: true,
      bulletClass: "swiper-pagination-bullet !size-4 border-2",
      bulletActiveClass:
        "swiper-pagination-bullet-active !bg-red-500 border-white",
    },
    modules: [Pagination],
  };

  const handleImageLoad = (categoryId: string) => {
    setLoadedImages((prev) => new Set(prev).add(categoryId));
  };

  return (
    <Swiper className="categories-slider mb-20" {...SwiperOptions}>
      {categories &&
        categories.map((cat) => (
          <SwiperSlide className="mb-8" key={cat._id}>
            <div className="relative">
              {/* Skeleton with shimmer effect */}
              {!loadedImages.has(cat._id) && (
                <div className="animate-pulse">
                  <div className="h-[15.625rem] w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg mb-4 bg-[length:200%_100%] animate-shimmer"></div>
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              )}

              {/* Actual Image */}
              <div
                className={`transition-opacity duration-500 ${
                  loadedImages.has(cat._id) ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={cat.image}
                  width={270}
                  height={250}
                  alt={cat.slug}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+fAQADhAGA/e0cyQAAAABJRU5ErkJggg=="
                  className="h-[15.625rem] object-contain bg-gray-100 dark:bg-gray-800 mb-4 rounded-lg"
                  onLoad={() => handleImageLoad(cat._id)}
                />
                <h3 className="font-medium dark:text-gray-100">{cat.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ICategory } from "../interfaces/categories.interface";
import Image from "next/image";
export default function CategoriesSlider({
  categories,
}: {
  categories: ICategory[];
}) {
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
  return (
    <Swiper className="categories-slider mb-20" {...SwiperOptions}>
      {categories &&
        categories.map((cat) => (
          <SwiperSlide className="mb-8" key={cat._id}>
            <Image
              src={cat.image}
              width={270}
              height={250}
              alt={cat.slug}
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+fAQADhAGA/e0cyQAAAABJRU5ErkJggg=="
              className="w-full h-[15.625rem] object-contain bg-gray-100 mb-4"
            />
            <h3 className="font-medium">{cat.name}</h3>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

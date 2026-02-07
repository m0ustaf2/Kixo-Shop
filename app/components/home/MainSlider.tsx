"use client";
import Image from "next/image";
import { useState } from "react";
import slide1 from "@/assets/images/man1-min.webp";
import slide2 from "@/assets/images/man2-min.webp";
import slide4 from "@/assets/images/man4-min.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const images = [
  { path: slide1.src, label: "slide1image" },
  { path: slide2.src, label: "slide2image" },
  { path: slide4.src, label: "slide4image" },
];

export default function MainSlider() {
  const [isLoaded, setIsLoaded] = useState(false);

  const SwiperOptions = {
    pagination: {
      clickable: true,
      bulletClass: "swiper-pagination-bullet !size-4 border-2",
      bulletActiveClass:
        "swiper-pagination-bullet-active !bg-red-500 border-white",
    },
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    modules: [Pagination, Autoplay],
    onAfterInit: () => {
      setTimeout(() => setIsLoaded(true), 100);
    },
  };

  return (
    <section>
      <div className="container my-5">
        <div className="relative">
          {/* Skeleton */}
          {!isLoaded && (
            <div className="absolute inset-0 z-10 animate-pulse">
              <div className="w-full h-[21.5rem] bg-gray-300 dark:bg-gray-700 rounded-lg" />
            </div>
          )}

          {/* Swiper with fade-in */}
          <div
            className={`transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Swiper className="main-slider" {...SwiperOptions}>
              {images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative w-full h-[21.5rem]">
                    <Image
                      src={image.path}
                      alt={image.label}
                      fill
                      className="object-cover"
                      unoptimized
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+fAQADhAGA/e0cyQAAAABJRU5ErkJggg=="
                      priority={idx === 0} // Load first image with priority
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

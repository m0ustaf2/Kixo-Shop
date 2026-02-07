"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductSwiper({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };
  return (
    <div className="w-full">
      {/* Main Swiper */}
      <div className="relative mb-4 group">
        <Swiper
          spaceBetween={10}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="main-product-swiper rounded-lg overflow-hidden"
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="bg-gray-100 flex items-center justify-center relative overflow-hidden cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={image}
                  width={600}
                  height={600}
                  alt={`Product image ${idx + 1}`}
                  className=" h-[28rem] md:h-[37.5rem] object-contain transition-transform duration-200"
                  style={{
                    transform: isZooming ? "scale(2)" : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                  priority={idx === 0}
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Swiper */}
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbs-swiper"
          breakpoints={{
            640: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 6,
            },
          }}
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx} className="cursor-pointer">
              <div className="border-2 border-gray-200 hover:border-red-500 transition-colors rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={image}
                  width={100}
                  height={100}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-20 md:h-24 object-contain"
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

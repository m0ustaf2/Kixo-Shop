"use client";
import Image from "next/image";
import slide1 from "@/assets/images/slider-image-1.jpeg";
import slide2 from "@/assets/images/slider-image-2.jpeg";
import slide3 from "@/assets/images/slider-image-3.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const images = [
  { path: slide1.src, label: "slide1image" },
  { path: slide2.src, label: "slide2image" },
  { path: slide3.src, label: "slide3image" },
];
export default function MainSlider() {
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
  };
  return (
    <>
      <section>
        <div className="container my-5  ">
          <div>
            <Swiper className="main-slider" {...SwiperOptions}>
              {images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <Image
                    src={image.path}
                    width={1920}
                    height={344}
                    alt={image.label}
                    loading="lazy"
                    className="w-full h-[21.5rem] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

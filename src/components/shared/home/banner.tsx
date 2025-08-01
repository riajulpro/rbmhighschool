"use client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

export default function Banner({ images }: { images: string[] }) {
  return (
    <div className="h-48 md:h-[500px] mb-5 rounded overflow-hidden">
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="bg-green-300 overflow-hidden h-full w-full"
          >
            <Image
              src={image}
              alt={`slide_${index}`}
              width={1000}
              height={500}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

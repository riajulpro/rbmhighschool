"use client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

export default function Banner() {
  const slideElements = [
    {
      title: "Slide 1",
      imgUrl: "/images/slide/slide_1.jpg",
    },
    {
      title: "Slide 2",
      imgUrl: "/images/slide/slide_2.jpg",
    },
    {
      title: "Slide 1",
      imgUrl: "/images/slide/slide_3.jpg",
    },
  ];

  return (
    <div className="h-48 md:h-96 mb-3 rounded overflow-hidden">
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
        {slideElements.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="bg-green-300 overflow-hidden h-full w-full"
          >
            <Image
              src={slide.imgUrl}
              alt={slide.title}
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

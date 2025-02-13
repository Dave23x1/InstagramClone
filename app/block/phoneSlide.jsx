"use client";

import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import screenshot from "@/Static/screenshot.json";

export default function PhoneSlide() {
  const [autoplay] = useState(true);

  return (
    <div className="absolute  top-[30px] w-[265px] left-1/4 translate-x-[163px]">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={autoplay ? { delay: 4000 } : false}
        modules={[Autoplay]}
      >
        {screenshot.map((item, index) => (
          <SwiperSlide key={index}>
            <Image
              src={item.image}
              width={265}
              height={400}
              alt="screenshot"
              className="bg-contain 
              "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

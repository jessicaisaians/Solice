"use client";
import { Roboto } from "next/font/google";
import { FC } from "react";
const grotesk = Roboto({ weight: "400", subsets: ["latin"] });

interface HeroImageProps {}

const HeroImage: FC<HeroImageProps> = ({}) => {
  return (
    <div
      className={`h-fit md:flex  flex-col relative z-5 order-1 justify-center items-center text-white/80  font-bold lg:absolute lg:top-[40%] lg:-translate-y-1/2 lg:bottom-0 lg:left-[54px] lg:h-screen`}
    >
      <div
        data-scroll
        style={{ direction: "ltr" }}
        className={`${grotesk.className} select-none z-30 cursor-scale z-5 flex justify-center items-center text-white/80 text-3xl font-bold`}
      >
        <h1
          data-scroll
          data-scroll-position="top"
          data-scroll-speed="4"
          data-scroll-delay="0.7"
        >
          S
        </h1>
        <h1
          data-scroll-position="top"
          data-scroll
          data-scroll-speed="4"
          data-scroll-delay="0.6"
        >
          o
        </h1>
        <h1
          data-scroll-position="top"
          data-scroll
          data-scroll-speed="4"
          data-scroll-delay="0.5"
        >
          l
        </h1>
        <h1
          data-scroll-position="top"
          data-scroll
          data-scroll-speed="4"
          data-scroll-delay="0.4"
        >
          i
        </h1>
        <h1
          data-scroll-position="top"
          data-scroll
          data-scroll-speed="4"
          data-scroll-delay="0.3"
        >
          c
        </h1>
        <h1
          data-scroll-position="top"
          data-scroll
          data-scroll-speed="4"
          data-scroll-delay="0.2"
        >
          e
        </h1>
      </div>
      <h2
        className="text-stone-400 tracking-wider text-sm mt-2 mb-4 lg:my-1"
        data-scroll-position="top"
        data-scroll
        data-scroll-speed="5"
        data-scroll-delay="1"
      >
        شیک. مدرن. منحصربه‌فرد
      </h2>
    </div>
  );
};
export default HeroImage;

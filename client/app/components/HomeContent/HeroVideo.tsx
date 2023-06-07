"use client";

import { Cinzel_Decorative } from "next/font/google";
import { FC } from "react";

const cinzel = Cinzel_Decorative({ weight: "700", subsets: ["latin"] });
interface HeroVideoProps {}
const HeroVideo: FC<HeroVideoProps> = ({}) => {
  return (
    <section className="w-full h-[100vh] relative">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-1 bg-black/40"></div>
      <div
        className={`flex-col z-30 absolute top-0 bottom-0 left-0 right-0 z-5 flex justify-center items-center text-white/80 text-5xl font-bold`}
      >
        <div
          style={{ direction: "ltr" }}
          className={`${cinzel.className} select-none z-30 cursor-scale z-5 flex justify-center items-center text-white/80 text-5xl font-bold`}
        >
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.24">
            S
          </h1>
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.20">
            o
          </h1>
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.16">
            l
          </h1>
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.14">
            i
          </h1>
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.10">
            c
          </h1>
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.05">
            e
          </h1>
        </div>
        <h2
          className="text-zinc-300 tracking-wider text-lg mt-1"
          data-scroll
          data-scroll-speed="4"
          data-scroll-delay="0.05"
        >
          شیک. مدرن. منحصربه‌فرد
        </h2>
      </div>
      <video
        controlsList="no-download"
        className="w-full h-[100vh] object-cover"
        src={"/videos/heroVid.mp4"}
        itemType="video/mp4"
        autoPlay
        muted
        loop
      ></video>
    </section>
  );
};
export default HeroVideo;

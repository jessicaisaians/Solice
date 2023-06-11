"use client";
import { gsap } from "gsap";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { FC } from "react";
const grotesk = Roboto({ weight: "400", subsets: ["latin"] });

interface IndexProps {}

const adjustImgBorderRadius = () => {
  gsap.to(".header_img_wrapper-inner", {
    borderRadius: "9rem",
  });
};
const revertImgBorderRadius = () => {
  gsap.to(".header_img_wrapper-inner", {
    borderRadius: "20rem",
  });
};
const Index: FC<IndexProps> = ({}) => {
  var tl: ReturnType<typeof gsap.timeline>;
  const skewImg = () => {
    const images = document.querySelectorAll(".header_img");
    const noOfImages = images.length;
    const duration = 0.5;
    const pause = 0.75;
    let stagger = duration + pause;
    let repeatDelay = stagger * (noOfImages - 1) + pause;
    tl = gsap.timeline({
      repeat: -1,
    });

    tl.from(images, {
      duration: duration,
      opacity: 0,
      transform: "scale(1.3) skew(0deg, 3deg)",
      stagger: {
        each: stagger,
        repeat: -1,
        repeatDelay: repeatDelay,
      },
    }).to(
      images,
      {
        duration: duration,
        opacity: 0,
        transform: "scale(1.3) skew(0deg, 3deg)",
        stagger: {
          each: stagger,
          repeat: -1,
          repeatDelay: repeatDelay,
        },
      },
      stagger
    );
  };
  const unSkewImg = () => {
    if (!!tl) {
      tl?.pause(1);
      tl?.kill();
      // revert the img styles
      const images = document.querySelectorAll(".header_img");
      images.forEach((image) =>
        gsap.to(image, {
          opacity: 1,
          transform: "translate(0px, 0px)",
        })
      );
    }
  };
  return (
    <section className="header_container">
      <div
        className={`h-screen flex-col z-30 absolute top-0 bottom-0 left-[54px]  z-5 flex justify-center items-center text-white/80  font-bold`}
      >
        <div
          style={{ direction: "ltr" }}
          className={`${grotesk.className} select-none z-30 cursor-scale z-5 flex justify-center items-center text-white/80 text-3xl font-bold`}
        >
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.7">
            S
          </h1>
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.6">
            o
          </h1>
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.5">
            l
          </h1>
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.4">
            i
          </h1>
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.3">
            c
          </h1>
          <h1 data-scroll data-scroll-speed="4" data-scroll-delay="0.2">
            e
          </h1>
        </div>
        <h2
          className="text-stone-400 tracking-wider text-sm mt-0"
          data-scroll
          data-scroll-speed="5"
          data-scroll-delay="1"
        >
          شیک. مدرن. منحصربه‌فرد
        </h2>
      </div>
      <div className="header_img_container">
        <div className="header_img_wrapper">
          <div className="header_img_wrapper-inner">
            <div
              className="header_img_parallax_wrapper"
              onMouseOver={() => {
                adjustImgBorderRadius();
                skewImg();
              }}
              onMouseOut={() => {
                revertImgBorderRadius();
                unSkewImg();
              }}
            >
              <Image
                data-scroll
                data-scroll-speed="0.1"
                data-scroll-delay="0.1"
                className="header_img header_img_2 z-30"
                src="/images/header-img.jpg"
                width="500"
                height="500"
                alt="woman-sitting-on-rock"
              />
              <Image
                data-scroll
                data-scroll-speed="0.1"
                data-scroll-delay="0.1"
                className="header_img header_img_3 z-10 brightness-75 sepia-0"
                src="/images/dress.jpg"
                width="500"
                height="500"
                alt="woman_wearing_suit"
              />
              <Image
                data-scroll
                data-scroll-speed="0.1"
                data-scroll-delay="0.1"
                className="header_img header_img_4 z-10  brightness-75 sepia-0"
                style={{ top: "30px !important" }}
                src="/images/header7.jpg"
                width="500"
                height="500"
                alt="girl-with-designer-outfit"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen absolute top-0 bottom-0 right-[54px] flex justify-center items-center">
        <a
          href="/shop"
          className="relative px-3 py-1 h-auto transition-all duration-300 view flex-row gap-2 z-5 flex justify-center items-center text-white/80 text-1xl"
        >
          فروشگاه{" "}
          <svg
            className="rotate-180"
            width="29"
            height="18"
            viewBox="0 0 29 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 7.85C1.36487 7.85 0.85 8.36487 0.85 9C0.85 9.63513 1.36487 10.15 2 10.15L2 7.85ZM27.8132 9.81317C28.2623 9.36407 28.2623 8.63593 27.8132 8.18682L20.4946 0.86827C20.0455 0.419168 19.3174 0.419168 18.8683 0.86827C18.4192 1.31737 18.4192 2.04551 18.8683 2.49462L25.3737 9L18.8683 15.5054C18.4192 15.9545 18.4192 16.6826 18.8683 17.1317C19.3174 17.5808 20.0455 17.5808 20.4946 17.1317L27.8132 9.81317ZM2 10.15L27 10.15L27 7.85L2 7.85L2 10.15Z"
              fill="url(#paint0_linear_2489_798)"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_2489_798"
                x1="2"
                y1="9"
                x2="18.2118"
                y2="14.3842"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#57534e" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#57534e"></stop>
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute bottom-[-.45rem] left-0 rotate-180">
            <svg
              width="120"
              height="4"
              viewBox="0 0 137 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L135 2.00001"
                stroke="url(#paint0_linear_2489_813)"
                strokeWidth="2.3"
                strokeLinecap="round"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_2489_813"
                  x1="2"
                  y1="2"
                  x2="28.8656"
                  y2="55.9005"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#57534e" stopOpacity="0"></stop>
                  <stop offset="1" stopColor="#57534e"></stop>
                </linearGradient>
              </defs>
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
};
export default Index;

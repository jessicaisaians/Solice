"use client";
import { FC } from "react";

interface HeroImageProps {}

const HeroImage: FC<HeroImageProps> = ({}) => {
  return (
    <div className="h-fit lg:h-screen lg:absolute lg:top-[40%] lg:-translate-y-1/2 lg:right-[54px] flex order-4 justify-center items-center">
      <a
        href="/shop"
        className="view mb-20 lg:mb-0 relative px-3 py-1 h-auto transition-all duration-300 view flex-row gap-2 z-5 flex justify-center items-center text-white/80 text-2xl lg:text-xl"
      >
        فروشگاه
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
  );
};
export default HeroImage;

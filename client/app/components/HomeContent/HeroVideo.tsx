"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FC, useEffect, useRef } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { Space_Grotesk } from "next/font/google";
const grotesk = Space_Grotesk({ weight: "400", subsets: ["latin"] });
interface HeroVideoProps {}
const HeroVideo: FC<HeroVideoProps> = ({}) => {
  const { scroll } = useLocomotiveScroll();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let tl: gsap.core.Timeline | undefined;
    if (scroll) {
      const element = scroll?.el;
      scroll.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(element, {
        scrollTop(value) {
          return arguments.length
            ? scroll.scrollTo(value, { duration: 0, disableLerp: true })
            : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: element.style.transform ? "transform" : "fixed",
      });
      ScrollTrigger.addEventListener("refresh", () => scroll?.update());
      ctx = gsap.context(() => {
        // tl = gsap.timeline({
        //   scrollTrigger: {
        //     scroller: scroll.el,
        //     trigger: ".parallax-img",
        //     scrub: true,
        //     start: "top top",
        //     end: "bottom center",
        //   },
        // });
        // tl.to(".parallax-img", {
        //   clipPath: "circle(200px at center)",
        //   ease: "none",
        //   onUpdate: () => {
        //     const scrollY = scroll.scroll.instance.scroll.y;
        //     const value = Math.min(500, scrollY);
        //     gsap.set(".parallax-img", {
        //       clipPath: `circle(${value + 200}px at center)`,
        //     });
        //   },
        // });
        tl = gsap.timeline({
          scrollTrigger: {
            scroller: scroll.el,
            trigger: ".parallax-img",
            scrub: true,
            start: "top top",
            end: "bottom center",
          },
        });
        tl.to(".parallax-img", {
          clipPath: "circle(500px at center)",
          ease: "none",
          onUpdate: () => {
            const scrollY = scroll.scroll.instance.scroll.y;
            const value = Math.max(400 - scrollY, 0);
            gsap.set(".parallax-img", {
              clipPath: `circle(${value}px at center)`,
            });
          },
        });
        ScrollTrigger.refresh();
      }, ref);
    }

    return () => {
      ctx && ctx.revert();
      ScrollTrigger.removeEventListener("refresh", () => ctx && ctx.revert());
    };
  }, [scroll]);
  return (
    <div
      className="zoom-out h-[100vh] max-h-[800px] flex flex-row flex-wrap"
      data-scroll
      data-scroll-sticky
    >
      <section className="mx-auto w-full  h-full relative " ref={ref}>
        <div className="w-full h-full relative flex flex-col ">
          <div className="absolute top-0 bottom-0 left-0 right-0 z-1 bg-stone-900/30"></div>
          <div
            className={`flex-col z-30 absolute top-0 bottom-0 left-[54px]  z-5 flex justify-center items-center text-white/80  font-bold`}
          >
            <div
              style={{ direction: "ltr" }}
              className={`${grotesk.className} select-none z-30 cursor-scale z-5 flex justify-center items-center text-white/80 text-3xl font-bold`}
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
              className="text-stone-400 tracking-wider text-md mt-0"
              data-scroll
              data-scroll-speed="4"
              data-scroll-delay="0.05"
            >
              شیک. مدرن. منحصربه‌فرد
            </h2>
          </div>
          {/* <video
            controlsList="no-download"
            className="w-full  h-full object-cover"
            src={"/videos/heroVid.mp4"}
            itemType="video/mp4"
            autoPlay
            playsInline
            muted
            loop
          ></video> */}
          <div className="parallax-container h-full flex flex-col justify-center items-center translate-none">
            <Image
              className="parallax-img w-full h-full object-contain"
              src="/images/header-img.jpg"
              width="500"
              height="500"
              alt="girl-with-designer-outfit"
            />
          </div>
          <div className="h-screen absolute top-0 bottom-0 right-[54px] flex justify-center items-center">
            <a
              href="/store"
              className="border-solid border-2 border-stone-600 rounded-sm px-3 py-1 h-auto  hover:border-stone-500 transition-all duration-300 view flex-row gap-2 z-5 flex justify-center items-center text-white/80 text-1xl"
            >
              فروشگاه
              <BsArrowLeft className="view text-white/80" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HeroVideo;

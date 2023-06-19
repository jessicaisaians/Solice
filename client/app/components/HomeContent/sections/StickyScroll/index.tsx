"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC, useEffect, useRef } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

interface IndexProps {}

gsap.registerPlugin(ScrollTrigger);

const Index: FC<IndexProps> = ({}) => {
  const { scroll } = useLocomotiveScroll();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
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

      let ctx = gsap.context(() => {
        gsap.to(".text-p", {
          backgroundPositionX: "100%",
          duration: 2, // Adjust the duration to make it slower
          ease: "slow(0.7, 0.7, false)", // Adjust the ease to control the speed
          stagger: 1,
          scrollTrigger: {
            scroller: scroll?.el,
            trigger: ".text-p",
            scrub: 1,

            start: "top center",
            end: "bottom top",
          },
        });
        ScrollTrigger.refresh();
      }, ref);
      return () => {
        ctx && ctx.revert();
        ScrollTrigger.removeEventListener("refresh", () => ctx && ctx.revert());
      };
    }
  }, [scroll]);
  return (
    <div
      className="services_trigger h-fit w-full mb-[30vh]  lg:mb-[50vh] lg:mt-[50vh]"
      ref={ref}
    >
      <div className="container flex justify-between items-start w-full max-w-full whitespace-pre-wrap">
        <div className="text-4xl w-full max-w-full whitespace-pre-wrap ">
          <p className="text-p max-w-full w-full m-auto text-center">
            استایل منحصر به فرد با سولیس
          </p>
        </div>
      </div>{" "}
    </div>
  );
};

export default Index;

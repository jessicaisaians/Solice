"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC, useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

interface ScrollTriggerProxyProps {}

const ScrollTriggerProxy: FC<ScrollTriggerProxyProps> = ({}) => {
  const { scroll } = useLocomotiveScroll();
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    if (scroll) {
      const element = scroll?.el;
      scroll.on("scroll", ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(element, {
        scrollTop(value) {
          return arguments.length
            ? scroll.scrollTo(value, 0, 0)
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
        pinType: (document.querySelector(".smooth-scroll") as any)?.style
          .transform
          ? "transform"
          : "fixed",
      });
    }
    return () => {
      ScrollTrigger.addEventListener("refresh", () => scroll?.update());
      ScrollTrigger.refresh();
    };
  }, [scroll]);
  return <div>ScrollTriggerProxy Page</div>;
};
export default ScrollTriggerProxy;

"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC, useLayoutEffect, useRef } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
interface IndexProps {}
gsap.registerPlugin(ScrollTrigger);
const Index: FC<IndexProps> = ({}) => {
  var tl: ReturnType<typeof gsap.timeline> | undefined;
  const { scroll } = useLocomotiveScroll();
  const ref = useRef(null);
  var tl: ReturnType<typeof gsap.timeline> | undefined;
  useLayoutEffect(() => {
    let ctx: any;
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
      gsap.to(".footer", {
        scrollTrigger: {
          trigger: ".footer_trigger",
          start: "top top",
          endTrigger: ".end_trigger",
          end: "top top",
          scroller: scroll?.el,
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        visibility: "inherit",
        duration: 1.2,
        ease: "power4.easeIn",
      });
    }
    return () => ctx && ctx.revert();
  }, [scroll]);
  return (
    // linear-gradient(180deg,#5a81a2,#1f3d61)
    <section
      id="bab"
      ref={ref}
      className="footer_sec"
      // className="h-[200vh] -mt-[105vh] min-h-[594px] pt-[110vh] px-[28px] pb-[17.64rem] bottom-0 max-w-full w-full z-10"
    >
      <div
        className="footer_trigger relative visible opacity-1 w-full"
        // className="trigger relative opacity-1 visible h-full w-full flex flex-col justify-between"
      >
        <div
          data-scroll-target="#bab"
          data-scroll-sticky
          data-scroll
          className="footer bg-stone-950 h-screen w-screen flex flex-col items-center justify-center"
          // className="footer opacity-0 invisible h-screen left-0 w-screen top-0 -z-10 absolute bg-gradient-to-b from-[#5a81a2]  to-[#1f3d61]"
        ></div>
        <Menu />
        <MenuMobile/>
      </div>
    </section>
  );
};
export default Index;

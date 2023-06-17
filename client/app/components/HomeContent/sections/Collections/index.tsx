"use client";
import useWindowSize from "@/app/hooks/useWindowSize";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap/dist/gsap";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
interface IndexProps {}
gsap.registerPlugin(ScrollTrigger);
export const ScrollableImage = ({
  src,
  itemsPerRow,
}: {
  src: string;
  itemsPerRow: number;
}) => (
  <div
    className={`quotes-container shrink-0 md:w-1/${itemsPerRow} p-8 md:py-20 rounded-3xl`}
  >
    <Image
      className="w-auto h-[400px] rounded-3xl"
      src={src}
      width={400}
      height={400}
      alt="image"
    />
  </div>
);
const Index: React.FC<IndexProps> = ({}) => {
  const { scroll } = useLocomotiveScroll();
  const ref = useRef<HTMLDivElement | null>(null);
  const { height, width } = useWindowSize();
  const [isSmallerThanM, setIsSmallerThanM] = useState<boolean>(false);
  useEffect(() => {
    if (width) setIsSmallerThanM(!!(width < 768));
  }, [height, width]);

  useLayoutEffect(() => {
    let ctx: gsap.Context | undefined;
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
        let sections = gsap.utils.toArray(".quotes-container");
        gsap.to(ref.current, {
          translateX: `${
            100 * Math.floor((sections.length - 1) / (isSmallerThanM ? 1 : 3))
          }vw`,
          ease: "easeInOut",
          scrollTrigger: {
            trigger: ref.current,
            scroller: scroll?.el,
            start: "top top",
            end: () => "+=" + ref.current!.scrollWidth,
            // end: () => "+=" + ref.current!.offsetWidth,
            scrub: isSmallerThanM ? 0.2 : 0.6,

            // markers: true,
            pin: ref.current,
            onRefresh: (self) => console.log("refresh", self.start, self.end),
          },
        });
        ScrollTrigger.refresh();
      }, ref);
    }
    return () => {
      ctx && ctx.revert();
      ScrollTrigger.removeEventListener("refresh", () => ctx && ctx.revert());
    };
  }, [scroll, isSmallerThanM]);

  return (
    <div className="text-white bg-neutral-900 py-[42px] lg:pt-[30vh] lg:pb-[10vh] my-10">
      <div className="quotes-wrapper" ref={ref}>
        <div className="flex">
          {[...Array(6)].map((item, index) => (
            <ScrollableImage
              key={index}
              src="/images/collection_patchwork_1.jpg"
              itemsPerRow={isSmallerThanM ? 1 : 3}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

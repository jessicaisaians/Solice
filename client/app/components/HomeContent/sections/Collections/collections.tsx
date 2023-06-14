"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC, useLayoutEffect, useRef } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import SectionImg from "./SectionImg";
import SectionText from "./SectionText";

gsap.registerPlugin(ScrollTrigger);
interface CollectionsProps {}

const Collections: FC<CollectionsProps> = ({}) => {
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
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#trigger",
          start: "center center",
          scroller: scroll?.el,
          // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
          end: () => "+=" + (ref?.current as any)?.clientHeight,
          // "+=" + ((ref?.current as any)?.clientHeight - window.innerHeight),
          scrub: true,
          pin: true,
        },
        defaults: { ease: "none" },
      });
      const baseDuration = 1.4;
      collections.forEach((_, index) => {
        index === collections.length - 1
          ? tl!.to(
              `.animated_img_${index + 1}`,
              {
                backgroundPosition: "0px 50%",
                opacity: "0",
                // ease: "ease",
                duration: baseDuration,
              },
              index * baseDuration
            )
          : tl!.to(
              `.animated_img_${index + 1}`,
              {
                backgroundPosition: "0px 65%",
                clipPath: "inset(0px 0px 100%)",
                duration: baseDuration,
              },
              index * baseDuration
            );
      });
      tl!.to(
        `.fake_txt`,
        {
          transform: "translateX(100px)",
          // ease: "ease",
          duration: baseDuration,
        },
        collections.length * baseDuration
      );
    }
    return () => ctx && ctx.revert();
  }, [scroll]);
  const collections = [
    {
      slug: "patchwork",
      name: "کالکشن موزائیک",
      img: "/images/collection_patchwork_1.jpg",
      id: 1,
    },
    {
      slug: "denim",
      img: "/images/collection_linen_5.jpg",
      name: "کالکشن جین",
      id: 2,
    },
    {
      slug: "suit",
      img: "/images/collection_coat_2.jpg",
      name: "کالکشن کت",
      id: 3,
    },
  ];
  return (
    // 360vh for 3 images
    // *0.74% for 3 images
    <section className={`flex static px-[5.4rem] `}>
      <div
        className="h-full overflow-hidden static w-1/2 z-10"
        data-scroll
        id="i1"
        ref={ref}
      >
        <div className="h-full static w-full">
          {collections.map((collection, index) => (
            <SectionText
              key={collection.id + "_collection"}
              classNamePostFix={index.toString()}
              index={index + 1}
              link={`/collections/${collection.slug}`}
              name={collection.name}
            />
          ))}
          <SectionText
            key={"all_collections"}
            classNamePostFix={(collections.length + 1).toString()}
            index={0}
            link={`/collections`}
            name={"مشاهده همه"}
          />
        </div>
      </div>
      <div className="content-center items-center box-border flex float-none h-screen right-1/2 overflow-visible absolute w-1/2 p-0">
        <div
          data-scroll
          // data-scroll-sticky
          data-scroll-target="#i1"
          data-scroll-offset="0%,%45"
          style={{
            zIndex: 100,
          }}
          id="trigger"
          className="relative rounded-[11%] flex h-96 w-96 overflow-hidden "
        >
          {collections.map((collection, index) => (
            <SectionImg
              key={collection.id + "_image"}
              bgPosition={index === 0 ? "0px 50%" : "0px 35%"}
              bgUrl={collection.img}
              clipPath={
                index === collections.length - 1 ? "none" : "inset(0px)"
              }
              index={index}
              zIndex={collections.length - index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Collections;

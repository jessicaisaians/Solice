"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC, useEffect, useRef } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
interface ServicesProps {}
gsap.registerPlugin(ScrollTrigger);
const services = [
  {
    title: "ارسال رایگان",
    body: "ارسال رایگان به تمام نقاط ایران برای تمام سفارش ها.",
  },
  {
    title: "پرداخت ایمن",
    body: " پرداخت با کلیه کارت های عضو شتاب از طریق درگاه بانکی",
  },
  {
    title: "ضمانت اصالت کالا",
    body: "کلیه محصولات این فروشگاه اصلی و با ضمانت می باشد",
  },
];

const Services: FC<ServicesProps> = ({}) => {
  const { scroll } = useLocomotiveScroll();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
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
      gsap.to(".service", {
        duration: 3, // Adjust the duration to make it slower
        opacity: 1,
        transform: "translateX(0)",
        stagger: 3,
        ease: "slow(1, 1, false)", // Adjust the ease to control the speed
        scrollTrigger: {
          scroller: scroll?.el,
          trigger: ".services_trigger",
          scrub: 1,
          start: "top top",
        },
      });
      ScrollTrigger.refresh();
    }
    return () => {
      ctx && ctx.revert();
      ScrollTrigger.removeEventListener("refresh", () => ctx && ctx.revert());
    };
  }, [scroll]);
  return (
    <section className="services_container flex flex-col gap-10  h-[90vh] sm:h-[80vh] md:h-[90vh] lg:h-[80vh] items-center w-[90%] lg:w-1/2 left-1/2 -translate-x-1/2 mt-10 absolute bottom-[130vh] lg:bottom-[160vh]">
      {services?.map((service, index) => (
        <div
          key={`${index}_${service.title}`}
          className="service p-12 flex flex-col gap-5 items-center bg-stone-950 rounded-3xl opacity-0 -translate-x-full"
        >
          <h4 className="text-3xl font-bold text-stone-300 relative text-center">
            {service.title}
          </h4>
          <p className="text-md text-stone-400 relative text-center">
            {service.body}
          </p>
        </div>
      ))}
    </section>
  );
};
export default Services;

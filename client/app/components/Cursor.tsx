"use client";
import { gsap } from "gsap";
import { FC, useEffect } from "react";
interface CursorProps {}

export const initCustomCursor = () => {
  const cursor: HTMLElement | null = document.getElementById("custom-cursor");
  // Check if the device supports touch events

  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints;

  if (cursor) {
    if (isTouchDevice) {
      // Add a CSS class to hide the cursor on touch devices
      cursor.classList.add("hide-cursor");
    }
    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    });
    const links = document.querySelectorAll("a");
    const shouldScale = document.querySelectorAll(".cursor-scale");
    const cursorText: HTMLDivElement | null =
      document.querySelector(".cursor-text");

    const onMouseEnterLink = (e: any) => {
      const link = e.target;
      if (link.classList.contains("view")) {
        gsap.to(cursor, {
          scale: 4,
          ease: "power2.out",
          duration: 0.2,
        });
        if (cursorText) {
          cursorText.style.display = "block";
        }
      } else {
        gsap.to(cursor, { scale: 4, ease: "power2.out", duration: 0.2 });
      }
    };

    const onMouseLeaveLink = (e: any) => {
      gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });
      if (cursorText) cursorText.style.display = "none";
    };
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });
    shouldScale.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });
  }
};
const Cursor: FC<CursorProps> = ({}) => {
  // const pathname = usePathname();
  // useEffect(() => {
  //   const shouldApplyCustomCursor = pathname === "/";
  //   if (shouldApplyCustomCursor) initCustomCursor();
  // }, [pathname]);
  useEffect(() => {
    initCustomCursor();
  }, []);
  return (
    <div id="custom-cursor" className="custom-cursor">
      <span className="cursor-text text-stone-500">مشاهده</span>
    </div>
  );
};
export default Cursor;

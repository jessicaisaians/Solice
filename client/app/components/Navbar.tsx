"use client";
import clsx from "clsx";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
interface NavbarProps {}

const linkWidthMap = {
  "/": ".home_link",
  "/shop": ".shop_link",
  "/about": ".about_link",
  "/contact": ".contact_link",
};
const Navbar: FC<NavbarProps> = ({}) => {
  const pathname = usePathname();
  const [activeBoxWidth, setActiveBoxWidth] = useState("64");

  const adjustActiveBoxWidth = (w: string) => {
    gsap.to(".active_item_box", { width: `${w}px` });
    setActiveBoxWidth(w);
  };
  const adjustActiveBoxRight = (right: number) => {
    gsap.to(".active_item_box", {
      right: `${right}px`,
    });
  };

  useEffect(() => {
    const elementClassName = Object.hasOwn(linkWidthMap, pathname)
      ? linkWidthMap[pathname as keyof typeof linkWidthMap]
      : "";

    const element: HTMLDivElement | null = elementClassName
      ? document.querySelector(elementClassName)
      : null;
    const activeLink: HTMLDivElement | null =
      document.querySelector(".active_item_box");
    const navList: HTMLDivElement | null =
      document.querySelector(".nav_link_list");
    adjustActiveBoxWidth(element?.clientWidth?.toString() ?? "64");
    if (!!activeLink?.offsetLeft && element && navList) {
      const { right: elementRight } = element.getBoundingClientRect();
      const { right: navListRight } = navList.getBoundingClientRect();
      adjustActiveBoxRight(navListRight - elementRight);
    }
  }, [activeBoxWidth, pathname]);
  return (
    <nav className="navigation w-5/6 sm:w-2/3">
      <ul className="nav_link_list">
        <li
          className={clsx(
            "home_link",
            "nav_link_list_item",
            pathname === "/" ? "text-white" : "text-[#8c8c8c]"
          )}
          onClick={() => {
            const currElementWidth = document.querySelector(".home_link");

            adjustActiveBoxWidth(
              currElementWidth?.clientWidth?.toString() ?? "64"
            );
          }}
        >
          <Link
            className="h-full flex items-center font-medium text-xs  sm:text-md  md:text-base text-center"
            href={"/"}
          >
            خانه
          </Link>
        </li>
        <li
          className={clsx(
            "shop_link",
            "nav_link_list_item",
            pathname === "/shop" ? "text-white" : "text-[#8c8c8c]"
          )}
          onClick={() => {
            const currElementWidth = document.querySelector(".shop_link");
            adjustActiveBoxWidth(
              currElementWidth?.clientWidth?.toString() ?? "64"
            );
          }}
        >
          <Link
            className="h-full flex items-center font-medium text-xs  sm:text-md  md:text-base text-center"
            href={"/shop"}
          >
            فروشگاه
          </Link>
        </li>
        <li
          className={clsx(
            "shop_link",
            "nav_link_list_item",
            pathname === "/shop" ? "text-white" : "text-[#8c8c8c]"
          )}
          onClick={() => {
            const currElementWidth = document.querySelector(".shop_link");
            adjustActiveBoxWidth(
              currElementWidth?.clientWidth?.toString() ?? "64"
            );
          }}
        >
          <Link
            className="h-full flex items-center font-medium text-xs  sm:text-md  md:text-base text-center"
            href={"/collections"}
          >
            کالکشن‌ها
          </Link>
        </li>
        <li
          className={clsx(
            "contact_link",
            "nav_link_list_item",
            pathname === "/contact" ? "text-white" : "text-[#8c8c8c]"
          )}
        >
          <Link
            className="h-full flex items-center font-medium text-xs  sm:text-md  md:text-base text-center"
            href={"/contact"}
          >
            تماس با ما
          </Link>
        </li>
        <li
          className={clsx(
            "about_link",
            "nav_link_list_item",
            pathname === "/about" ? "text-white" : "text-[#8c8c8c]"
          )}
        >
          <Link
            className="h-full flex items-center font-medium text-xs  sm:text-md  md:text-base text-center"
            href={"/about"}
          >
            درباره ما
          </Link>
        </li>
        <li
          className={`right-5 active_item_box block absolute top-1/2 -translate-y-1/2 h-full my-auto mx-0 rounded-2xl will-change-transform -z-10 bg-[#2f3133] `}
          style={{
            transform: "translate(0%, -50%) translate(0, 0)",
            translate: "none",
            rotate: "none",
            scale: "none",
          }}
        ></li>
      </ul>
    </nav>
  );
};
export default Navbar;

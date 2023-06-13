"use client";
import { useWindowWidth } from "@react-hook/window-size";
import clsx from "clsx";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
interface HamburgerMenuProps {}

const HamburgerMenu: FC<HamburgerMenuProps> = ({}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onlyWidth = useWindowWidth();
  useEffect(() => {
    if (menuOpen) handleToggleMenu();
  }, [onlyWidth, pathname]);
  const translateMenuBars = () => {
    gsap.to(".menu_bar_1", {
      marginBottom: "-0.4rem",
      translateX: "0",
      translateY: "140%",
      rotate: "45deg",
      duration: "0.3",
    });
    gsap.to(".menu_bar_2", {
      marginBottom: "0.2rem",
      translateX: "0",
      translateY: "50%",
      rotate: "-45deg",
      duration: "0.3",
    });
  };
  const undoTranslateMenuBars = () => {
    gsap.to(".menu_bar_1", {
      marginBottom: "0",
      translateX: "0",
      translateY: "0",
      rotate: "0",
      duration: "0.3",
      delay: "0.2",
    });
    gsap.to(".menu_bar_2", {
      marginBottom: "0",
      translateX: "0",
      translateY: "0",
      rotate: "0",
      duration: "0.3",
      delay: "0.2",
    });
  };
  const handleToggleMenu = () => {
    setMenuOpen((prev) => {
      if (prev) {
        handleUndoStaggerListItems();
        handleUndoOpenFullScreenMenu();
        undoTranslateMenuBars();
      } else {
        translateMenuBars();
        handleOpenFullScreenMenu();
        handleStaggerListItems();
      }
      return !prev;
    });
  };

  const handleUndoOpenFullScreenMenu = () => {
    gsap.to(".mega_menu", {
      delay: "0.6",
      clipPath: "circle(0px at 100% 0%)",
      zIndex: "-1",
    });
  };
  const handleOpenFullScreenMenu = () => {
    gsap.to(".mega_menu", {
      clipPath: "circle(210vw at 100% 0%)",
      zIndex: "9998",
    });
  };

  const handleStaggerListItems = () => {
    gsap.to(".nav_link_list_item_mobile", {
      duration: 0.3,
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      stagger: { amount: 0.7 },
    });
  };

  const handleUndoStaggerListItems = () => {
    gsap.to(".nav_link_list_item_mobile", {
      duration: 0.5,
      opacity: 0,
      transform: "translate(0px, 70px) skew(0deg, 3deg)",
      stagger: { amount: 0.6 },
    });
  };
  return (
    <>
      <div
        className="mega_menu absolute inset-0 bg-neutral-900 h-auto min-h-screen block "
        style={{
          zIndex: -1,
          clipPath: "circle(0px at 100% 0%)",
        }}
      >
        <div className="py-[20vh] px-[45px]  flex w-full h-full">
          <ul className="flex flex-col gap-14 w-full items-center ">
            <li
              className={clsx(
                "home_link",
                "nav_link_list_item_mobile",
                "opacity-0  translate-x-0 translate-y-[70px] skew-y-3 skew-x-0",
                pathname === "/" ? "text-white" : "text-[#8c8c8c]"
              )}
            >
              <Link
                className="h-full flex items-center font-medium text-4xl  text-center"
                href={"/"}
              >
                خانه
              </Link>
            </li>
            <li
              className={clsx(
                "shop_link",
                "nav_link_list_item_mobile",
                "opacity-0  translate-x-0 translate-y-[70px]  skew-y-3 skew-x-0",
                pathname === "/shop" ? "text-white" : "text-[#8c8c8c]"
              )}
            >
              <Link
                className="h-full flex items-center font-medium text-4xl  text-center"
                href={"/shop"}
              >
                فروشگاه
              </Link>
            </li>
            <li
              className={clsx(
                "collections_link",
                "nav_link_list_item_mobile",
                "opacity-0 translate-x-0 translate-y-[70px] skew-y-3 skew-x-0",
                pathname === "/collections" ? "text-white" : "text-[#8c8c8c]"
              )}
            >
              <Link
                className="h-full flex items-center font-medium text-4xl  text-center"
                href={"/collections"}
              >
                کالکشن‌ها
              </Link>
            </li>
            <li
              className={clsx(
                "contact_link",
                "nav_link_list_item_mobile",
                "opacity-0 translate-x-0 translate-y-[70px]  skew-y-3  skew-x-0",
                pathname === "/contact" ? "text-white" : "text-[#8c8c8c]"
              )}
            >
              <Link
                className="h-full flex items-center font-medium text-4xl  text-center"
                href={"/contact"}
              >
                تماس با ما
              </Link>
            </li>
            <li
              className={clsx(
                "about_link",
                "nav_link_list_item_mobile",
                "opacity-0  translate-x-0 translate-y-[70px]  skew-y-3  skew-x-0",
                pathname === "/about" ? "text-white" : "text-[#8c8c8c]"
              )}
            >
              <Link
                className="h-full flex items-center font-medium text-4xl  text-center"
                href={"/about"}
              >
                درباره ما
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        onClick={handleToggleMenu}
        className="cursor-scale flex flex-col lg:hidden gap-[6px] absolute top-3 h-[45px] items-center justify-center right-10 w-6"
        style={{ zIndex: 9999 }}
      >
        <span className="menu_bar_1 bg-white relative rounded-3xl h-[0.16rem] w-full"></span>
        <span className="menu_bar_2 bg-white relative rounded-3xl  h-[0.16rem] w-full"></span>
      </div>
    </>
  );
};
export default HamburgerMenu;

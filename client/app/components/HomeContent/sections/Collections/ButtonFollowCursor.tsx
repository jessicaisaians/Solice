"use client";
import clsx from "clsx";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { getRelativeCoordinates } from "../Hero/gsapFunctions";

interface ButtonFollowCursorProps {
  btnText?: string;
  link: string;
  classNamePostFix: string;
  txtColor?: string;
  bgColor?: string;
  padding?: string;
}

const ButtonFollowCursor: FC<ButtonFollowCursorProps> = ({
  btnText = "مشاهده",
  link,
  classNamePostFix,
  txtColor,
  bgColor,
  padding,
}) => {
  const router = useRouter();
  const parallaxIt = (e: any, className: string, reverse?: boolean) => {
    const element: HTMLElement | null = document.querySelector(className);
    const { x, y } = getRelativeCoordinates(e, element);
    gsap.to(className, {
      x: reverse ? 0 : x,
      y: reverse ? 0 : y,
      ...(reverse ? { transform: "none" } : {}),
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const handleMouseOver = () => {
    const bounds = document.querySelector(
      `.btn-more-bound_${classNamePostFix}`
    );
    bounds!.addEventListener("mousemove", (e) =>
      parallaxIt(e, `.btn-more-area_${classNamePostFix}`)
    );
    gsap.to(`.btn-more-txt_${classNamePostFix}`, {
      color: txtColor ?? "rgb(0,0,0)",
      transform: "translate(0%, 130%) skew(0deg, -3deg)",
      duration: 0.2,
      ease: "out",
    });
    gsap.to(`.btn-more-ripple-inner_${classNamePostFix}`, {
      borderRadius: "0%",
      transform: "translate(0%, 0%)",
      duration: 0.3,
      ease: "out",
    });
  };
  const handleMouseOut = () => {
    const bounds = document.querySelector(
      `.btn-more-bound_${classNamePostFix}`
    );
    bounds!.removeEventListener("mousemove", (e) =>
      parallaxIt(e, `.btn-more-area_${classNamePostFix}`, true)
    );
    gsap.to(`.btn-more-area_${classNamePostFix}`, {
      x: "0 !important",
      y: "0 !important",
      transform: "none !important",
      duration: 0.4,
      ease: "out",
    });
    gsap.to(`.btn-more-txt_${classNamePostFix}`, {
      color: txtColor ?? "rgb(255,255,255)",
      transform: "translate(0px, 0px)",
      duration: 0.2,
      ease: "out",
    });
    const upOrDown = Math.floor(Math.random() * 2);
    gsap.to(`.btn-more-ripple-inner_${classNamePostFix}`, {
      borderRadius: "50%",
      transform: `translate(0%, ${upOrDown === 1 ? "-100%" : "100%"})`,
      duration: 0.3,
      ease: "slow",
    });
  };
  return (
    <>
      <div
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleMouseOver}
        onClick={() => router.push(link)}
        className={clsx(
          `btn-more-bound_${classNamePostFix}`,
          "btn-more-bound w-[160px] h-[100px] opacity-1 z-40 opacity-0 absolute"
        )}
      ></div>
      <div
        className={clsx(`btn-more-area_${classNamePostFix}`, "btn-more-area ")}
      >
        <Link
          href={link}
          className={clsx(`btn-more_${classNamePostFix}`, "btn-more ")}
          style={{
            backgroundColor: bgColor ?? "none",
            padding: padding ?? "13px 32px 13px",
            borderColor: bgColor ?? "white",
          }}
        >
          <span
            className={clsx(
              `btn-more-title_${classNamePostFix}`,
              "btn-more-title "
            )}
          >
            <span
              className={clsx(
                `btn-more-txt_${classNamePostFix}`,
                "btn-more-txt"
              )}
              style={{
                color: txtColor ?? "#fff",
              }}
              data-text={btnText}
            >
              {btnText}
            </span>
          </span>
          <span
            className={clsx(
              `btn-more-ripple_${classNamePostFix}`,
              "btn-more-ripple"
            )}
          >
            <span
              className={clsx(
                `btn-more-ripple-inner_${classNamePostFix}`,
                "btn-more-ripple-inner"
              )}
            />
          </span>
        </Link>
      </div>
    </>
  );
};
export default ButtonFollowCursor;

"use client";
import clsx from "clsx";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { getRelativeCoordinates } from "../Hero/gsapFunctions";

interface ButtonFollowCursorProps {
  btnText?: string;
  link: string;
  isLoading?: boolean;
  classNamePostFix: string;
  txtColor?: string;
  bgColor?: string;
  padding?: string;
  onClick?: () => any;
  type?: "submit" | "reset" | "button" | undefined;
}

const ButtonFollowCursor: FC<ButtonFollowCursorProps> = ({
  btnText = "مشاهده",
  link,
  isLoading,
  classNamePostFix,
  txtColor,
  bgColor,
  padding,
  type,
  onClick,
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
        onClick={() => {
          if (type === "submit" && !onClick) return;
          onClick ? onClick() : router.push(link);
        }}
        className={clsx(
          `btn-more-bound_${classNamePostFix}`,
          "btn-more-bound w-[160px] h-[100px] opacity-1 z-40 opacity-0 absolute"
        )}
      ></div>
      <div
        className={clsx(`btn-more-area_${classNamePostFix}`, "btn-more-area ")}
      >
        <button
          type={type ?? "button"}
          onClick={() => {
            if (type === "submit" && !onClick) return;
            onClick ? null : router.push(link);
          }}
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
              {isLoading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-2 w-4 h-7 mt-1 text-stone-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="rgb(87 83 78)"
                  ></path>
                </svg>
              )}
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
        </button>
      </div>
    </>
  );
};
export default ButtonFollowCursor;

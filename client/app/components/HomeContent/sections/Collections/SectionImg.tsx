"use client";
import Link from "next/link";
import { FC } from "react";

interface SectionImgProps {
  zIndex: number;
  bgUrl: string;
  bgPosition: string;
  clipPath: string;
  index: number;
}

const SectionImg: FC<SectionImgProps> = ({
  index,
  zIndex,
  bgUrl,
  bgPosition,
  clipPath,
}) => {
  return (
    <Link
      className="animated_img rounded-[2rem] lg:rounded-none overflow-hidden lg:overflow-auto w-full lg:w-auto h-[calc(100vw-(5vw*2))]"
      href={`/#c${index}`}
    >
      <div
        className={`animated_img_${index + 1} relative lg:absolute`}
        style={{
          zIndex,
          background: `url('${bgUrl}')`,
          backgroundPosition: bgPosition,
          clipPath: clipPath,
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          cursor: "none",
          backgroundSize: "cover",
        }}
      />
    </Link>
  );
};
export default SectionImg;

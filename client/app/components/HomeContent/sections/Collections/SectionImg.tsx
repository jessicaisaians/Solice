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
    <Link className="animated_img" href={`/#c${index}`}>
      <div
        className={`animated_img_${index + 1}`}
        style={{
          zIndex,
          background: `url('${bgUrl}')`,
          backgroundPosition: bgPosition,
          clipPath: clipPath,
          backgroundRepeat: "no-repeat",
          width: "100%",
          position: "absolute",
          height: "100%",
          cursor: "none",
          backgroundSize: "cover",
        }}
      />
    </Link>
  );
};
export default SectionImg;

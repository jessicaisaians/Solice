"use client";
import clsx from "clsx";
import Image from "next/image";
import { CSSProperties, FC } from "react";

export interface ImageComponentProps {
  scrollSpeed?: string;
  scrollDelay?: string;
  className?: string;
  src: string;
  alt: string;
  style?: CSSProperties | undefined;
}

const ImageComponent: FC<ImageComponentProps> = ({
  scrollSpeed,
  scrollDelay,
  className,
  src,
  alt,
  style,
}) => {
  return (
    <Image
      data-scroll
      data-scroll-position="bottom"
      data-scroll-speed={"1.7"}
      data-scroll-delay={"0.5"}
      className={clsx(
        "header_img",
        className,
        "absolute object-cover opacity-1 scale-1 rotate-0 inset-0 w-full h-full translate-x-0 translate-y-0"
      )}
      src={src}
      width="500"
      height="500"
      alt={alt}
      style={style}
    />
  );
};
export default ImageComponent;

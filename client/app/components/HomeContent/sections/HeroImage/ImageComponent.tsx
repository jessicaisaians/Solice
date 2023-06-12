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
      data-scroll-speed={scrollSpeed ?? "0.1"}
      data-scroll-delay={scrollDelay ?? "0.1"}
      className={clsx("header_img", className)}
      src={src}
      width="500"
      height="500"
      alt={alt}
      style={style}
    />
  );
};
export default ImageComponent;

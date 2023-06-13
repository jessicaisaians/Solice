"use client";
import { gsap } from "gsap";
import { FC } from "react";
import ImageComponent, { ImageComponentProps } from "./ImageComponent";
import {
  adjustImgBorderRadius,
  revertImgBorderRadius,
  skewImg,
  unSkewImg,
} from "./gsapFunctions";
interface HeroImageProps {}
const images: ImageComponentProps[] = [
  {
    src: "/images/header-img.jpg",
    alt: "woman-sitting-on-rock",
    className: "z-30",
  },
  {
    src: "/images/dress.jpg",
    alt: "woman_wearing_maxi_dress",
    className: "z-10 brightness-75 sepia-0",
  },
  {
    src: "/images/header7.jpg",
    alt: "girl-wearing-denim_skirt",
    className: "z-10 brightness-75 sepia-0",
    style: { top: "40px !important" },
  },
];
// position: absolute;
// width: 100%;
// height: 110%;
// left: 0;
// will-change: transform;
// translate: none;
// rotate: none;
// scale: none;
// transform: translate(0, -9%);
const HeroImage: FC<HeroImageProps> = ({}) => {
  var tl: ReturnType<typeof gsap.timeline> | undefined;
  return (
    <div className="relative flex justify-center items-center mb-20 min-w-0 order-3">
      <div className="header_img_wrapper will-change-transform w-full flex-shrink-0">
        <div className="header_img_wrapper-inner">
          <div
            className="absolute scale-1 rotate-0 w-full h-[110%] left-0 will-change-transform translate-x-0 -translate-y-[9%]"
            onMouseOver={() => {
              adjustImgBorderRadius();
              tl = skewImg(tl);
            }}
            onMouseOut={() => {
              revertImgBorderRadius();
              tl = unSkewImg(tl);
            }}
          >
            {images.map((img, index) => (
              <ImageComponent
                key={`img_${index}`}
                alt={img.alt}
                className={img.className}
                src={img.src}
                style={img.style}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroImage;

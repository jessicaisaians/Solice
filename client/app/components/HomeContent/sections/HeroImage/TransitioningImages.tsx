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
const HeroImage: FC<HeroImageProps> = ({}) => {
  var tl: ReturnType<typeof gsap.timeline> | undefined;
  return (
    <div className="header_img_container">
      <div className="header_img_wrapper">
        <div className="header_img_wrapper-inner">
          <div
            className="header_img_parallax_wrapper"
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

"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { FC } from "react";

interface IndexProps {}

const Index: FC<IndexProps> = async ({}) => {
  const adjustImgBorderRadius = () => {
    gsap.to(".header_img_wrapper-inner", {
      borderRadius: "9rem",
    });
  };
  const revertImgBorderRadius = () => {
    gsap.to(".header_img_wrapper-inner", {
      borderRadius: "20rem",
    });
  };

  var tl: ReturnType<typeof gsap.timeline>;
  const skewImg = () => {
    const images = document.querySelectorAll(".header_img");
    const noOfImages = images.length;
    const duration = 0.5;
    const pause = 0.75;
    let stagger = duration + pause;
    let repeatDelay = stagger * (noOfImages - 1) + pause;
    tl = gsap.timeline({
      repeat: -1,
    });

    tl.from(images, {
      duration: duration,
      opacity: 0,
      transform: "scale(1.3) skew(0deg, 3deg)",
      stagger: {
        each: stagger,
        repeat: -1,
        repeatDelay: repeatDelay,
      },
    }).to(
      images,
      {
        duration: duration,
        opacity: 0,
        transform: "scale(1.3) skew(0deg, 3deg)",
        stagger: {
          each: stagger,
          repeat: -1,
          repeatDelay: repeatDelay,
        },
      },
      stagger
    );
  };
  const unSkewImg = () => {
    if (!!tl) {
      tl?.pause(1);
      tl?.kill();
      // revert the img styles
      const images = document.querySelectorAll(".header_img");
      images.forEach((image) =>
        gsap.to(image, {
          opacity: 1,
          transform: "translate(0px, 0px)",
        })
      );
    }
  };
  return (
    <section className="header_container">
      <div className="header_img_container">
        <div className="header_img_wrapper">
          <div className="header_img_wrapper-inner">
            <div
              className="header_img_parallax_wrapper"
              onMouseOver={() => {
                adjustImgBorderRadius();
                skewImg();
              }}
              onMouseOut={() => {
                revertImgBorderRadius();
                unSkewImg();
              }}
            >
              <Image
                className="header_img header_img_2 z-30"
                src="/images/header-img.jpg"
                width="500"
                height="500"
                alt="woman-sitting-on-rock"
              />
              <Image
                className="header_img header_img_3 z-10"
                src="/images/header_img_2.jpg"
                width="500"
                height="500"
                alt="woman_wearing_suit"
              />
              <Image
                className="header_img header_img_4 z-10"
                src="/images/header_img_3.jpg"
                width="500"
                height="500"
                alt="girl-with-designer-outfit"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Index;

import { gsap } from "gsap";

export const adjustImgBorderRadius = () => {
  gsap.to(".header_img_wrapper-inner", {
    borderRadius: "9rem",
  });
};
export const revertImgBorderRadius = () => {
  gsap.to(".header_img_wrapper-inner", {
    borderRadius: "20rem",
  });
};

export const skewImg = (
  tl: ReturnType<typeof gsap.timeline> | undefined
): ReturnType<typeof gsap.timeline> => {
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
  return tl;
};
export const unSkewImg = (
  tl: ReturnType<typeof gsap.timeline> | undefined
): ReturnType<typeof gsap.timeline> | undefined => {
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
  return tl;
};


export const getRelativeCoordinates = (
  event: any,
  referenceElement: any
): { x: number; y: number } => {
  const { width, height, left, top } = referenceElement.getBoundingClientRect(); // gives you width, height, left-X,top-y of the button
  const x = event.clientX - left - width / 2;
  const y = event.clientY - top - height / 2;
  return { x: x * 0.2, y: y * 0.1 };
};
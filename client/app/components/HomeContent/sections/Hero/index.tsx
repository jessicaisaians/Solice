"use client";
import { FC } from "react";
import BrandSlogan from "./BrandSlogan";
import CTA from "./CTA";
import TransitioningImages from "./TransitioningImages";

interface IndexProps {}

const Index: FC<IndexProps> = ({}) => {
  return (
    <section className="header_container flex flex-col justify-center items-center pb-4 w-full relative overflow-hidden py-0 px-[5%] pt-[8vh] md:pt-[13vh] lg:pt-[15vh] mb-[0] lg:mb-[10vh]">
      <BrandSlogan />
      <TransitioningImages />
      <CTA />
    </section>
  );
};
export default Index;

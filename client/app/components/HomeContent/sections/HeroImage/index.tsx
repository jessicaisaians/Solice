"use client";
import { FC } from "react";
import BrandSlogan from "./BrandSlogan";
import CTA from "./CTA";
import TransitioningImages from "./TransitioningImages";

interface IndexProps {}

const Index: FC<IndexProps> = ({}) => {
  return (
    <section className="header_container flex flex-col">
      <BrandSlogan />
      <TransitioningImages />
      <CTA />
    </section>
  );
};
export default Index;

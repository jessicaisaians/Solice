"use client";
import { FC, useRef } from "react";
import LocomotiveScrollProviderClient from "../LocomotiveScrollProviderClient";
import HeroImage from "./sections/HeroImage";

interface IndexProps {
  children: any;
}

const Index: FC<IndexProps> = ({ children }) => {
  const containerRef = useRef<null | HTMLDivElement>(null);

  return (
    <LocomotiveScrollProviderClient
      props={{
        options: {
          smooth: true,
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
        },
        watch: [],
        containerRef: containerRef,
      }}
    >
      <main
        className="App min-h-[1200px] relative"
        data-scroll-container
        ref={containerRef}
      >
     
        {children}
        {/* <StickyScroll /> */}
        {/* <Collections />
        <Footer /> */}
      </main>
    </LocomotiveScrollProviderClient>
  );
};
export default Index;

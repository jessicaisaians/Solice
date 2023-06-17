"use client";
import { FC, useRef } from "react";
import Cursor from "../Cursor";
import HamburgerMenu from "../HamburgerMenu";
import LocomotiveScrollProviderClient from "../LocomotiveScrollProviderClient";
import Navbar from "../Navbar";

interface IndexProps {
  children: any;
}

const Index: FC<IndexProps> = ({ children }) => {
  const containerRef = useRef<null | HTMLDivElement>(null);

  return (
    <main className="min-h-[1200px] relative">
      <Navbar />
      <HamburgerMenu />
      <Cursor />

      <LocomotiveScrollProviderClient
        props={{
          options: {
            lerp: 0.03, // Linear Interpolation, 0 > 1 // Try 0.01
            multiplier: 1.4, // Effect Multiplier,
            touchMultiplier: 2.1,
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
        <div className="App" data-scroll-container ref={containerRef}>
          {children}
          {/* <StickyScroll /> */}
        </div>
      </LocomotiveScrollProviderClient>
    </main>
  );
};
export default Index;

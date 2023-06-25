"use client";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname(); // With next/router

  return (
    <main className="min-h-[1200px] relative">
      <Navbar />
      <HamburgerMenu />
      <Cursor />

      <LocomotiveScrollProviderClient
        props={{
          options: {
            lerp: 0.03, // Linear Interpolation, 0 > 1 // Try 0.01
            multiplier: 1.2, // Effect Multiplier,
            touchMultiplier: 2.1,
            smooth: true,
            smartphone: {
              smooth: true,
            },
            tablet: {
              smooth: true,
            },
          },
          location: pathname,
          watch: [],
          containerRef: containerRef,
          onLocationChange: (scroll) =>
            scroll.scrollTo(0, { duration: 0, disableLerp: true }),
          onUpdate: () => console.log("Updated, but not on location change!"), // Will trigger on
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

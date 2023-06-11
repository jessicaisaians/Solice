"use client";
import { FC, useRef } from "react";
import LocomotiveScrollProviderClient from "../LocomotiveScrollProviderClient";
import Navbar from "../Navbar";
import Cursor from "../Cursor";

interface IndexProps {
  children: any;
}

const Index: FC<IndexProps> = ({ children }) => {
  const containerRef = useRef<null | HTMLDivElement>(null);

  return (
    <main className="min-h-[1200px] relative">
      <Navbar />
      <Cursor />
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
        <div className="App" data-scroll-container ref={containerRef}>
          {children}
          {/* <StickyScroll /> */}
          {/* <Collections />
        <Footer /> */}
        </div>
      </LocomotiveScrollProviderClient>
    </main>
  );
};
export default Index;

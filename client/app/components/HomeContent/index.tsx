"use client";
import { FC, useRef } from "react";
import LocomotiveScrollProviderClient from "../LocomotiveScrollProviderClient";
import HeroVideo from "./HeroVideo";

interface IndexProps {}

const Index: FC<IndexProps> = ({}) => {
  const containerRef = useRef(null);
  return (
    <LocomotiveScrollProviderClient
      props={{
        options: {
          smooth: true,
          smartphone: {
            smooth: true,
          },
        },
        watch: [],
        containerRef,
      }}
    >
      <main
        className="min-h-[1200px] overflow-hidden relative"
        data-scroll-container
        ref={containerRef}
      >
        <HeroVideo />
        <h2>Video</h2>
        <h2>Logo</h2>
        <h2>Navbar</h2>
      </main>
    </LocomotiveScrollProviderClient>
  );
};
export default Index;

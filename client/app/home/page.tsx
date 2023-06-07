"use client";
import { FC, useRef } from "react";
import LocomotiveScrollProviderClient from "../components/LocomotiveScrollProviderClient";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const containerRef = useRef(null);
  return (
    <LocomotiveScrollProviderClient
      props={{ options: { smooth: true }, watch: [], containerRef }}
    >
        
    </LocomotiveScrollProviderClient>
  );
};
export default Page;

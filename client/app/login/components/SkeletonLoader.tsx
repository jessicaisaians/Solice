"use client";
import { FC } from "react";

interface SkeletonLoaderProps {}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({}) => {
  return (
    <div role="status" className="max-w-full animate-pulse ">
      <div className="h-10 mx-auto bg-neutral-500 rounded-lg dark:bg-neutral-700 w-2/4 mb-10"></div>
      <div className="h-8 bg-neutral-500 rounded-xl dark:bg-neutral-700 w-[350px] mb-8"></div>
      <div className="mx-auto w-[100px] h-[45px] bg-neutral-500 rounded-full"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
export default SkeletonLoader;

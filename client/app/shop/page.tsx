"use client";
import { FC } from "react";
import Catalog from "./components/Catalog";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <div className="pt-24 px-[54px]">
      <Catalog />
    </div>
  );
};
export default Page;

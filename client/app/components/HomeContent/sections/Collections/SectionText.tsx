"use client";
import clsx from "clsx";
import { FC } from "react";
import ButtonFollowCursor from "./ButtonFollowCursor";

interface SectionTextProps {
  index: number;
  name: string;
  link: string;
  isFake?: boolean;
  classNamePostFix: string;
}

const SectionText: FC<SectionTextProps> = ({
  classNamePostFix,
  index,
  link,
  name,
  isFake,
}) => {
  return (
    <div
      className={clsx(
        isFake ? "fake_txt" : "",
        "header_container  w-full select-none"
      )}
    >
      <div className="flex flex-col items-center lg:items-start h-auto lg:h-[100vh] justify-center lg:ml-auto  mx:0 lg:mr-[30%] my-16 lg:my-[0px] static text-left w-full">
        <span className="mb-1 text-stone-400 text-sm hidden lg-block">
          {index < 10 ? `0${index}` : index}
        </span>
        <h4 className="text-white lg:text-2xl text-3xl mb-3 lg:mb-none">
          {name}
        </h4>
        <div className="opacity-1  scale-1 rotate-0 translate-0 transform-none -mb-[40px] -mt-[11px] pb-0 text-center lg:text-base text-xl">
          <ButtonFollowCursor link={link} classNamePostFix={classNamePostFix} />
        </div>
      </div>
    </div>
  );
};
export default SectionText;

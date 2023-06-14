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
    <div className={clsx(isFake ? "fake_txt" : "", "header_container  w-[11.8rem]")}>
      <div className="flex flex-col items-start h-[100vh] justify-center ml-auto mr-[25.2px] mt-[0px] static text-left w-full">
        <span className="mb-1 text-stone-400 text-sm">
          {index < 10 ? `0${index}` : index}
        </span>
        <h4 className="text-white text-2xl">{name}</h4>
        <div className="opacity-1  scale-1 rotate-0 translate-0 transform-none -mb-[40px] -mt-[11px] pb-0 text-center">
          <ButtonFollowCursor link={link} classNamePostFix={classNamePostFix} />
        </div>
      </div>
    </div>
  );
};
export default SectionText;

"use client";
import { FC } from "react";
import {
  LocomotiveScrollProvider,
  LocomotiveScrollProviderProps,
} from "react-locomotive-scroll";
interface LocomotiveScrollProviderClientProps {
  children: any;
  props: LocomotiveScrollProviderProps;
}

const LocomotiveScrollProviderClient: FC<
  LocomotiveScrollProviderClientProps
> = ({ children, props }) => {
  return (
    <LocomotiveScrollProvider {...props}>{children}</LocomotiveScrollProvider>
  );
};
export default LocomotiveScrollProviderClient;

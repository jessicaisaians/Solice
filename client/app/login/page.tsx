"use client";
import { FC, useState } from "react";
import UseUnAuthOnly from "../hooks/useUnAuthOnly";
import InitialForm from "./components/InitialForm";
import SkeletonLoader from "./components/SkeletonLoader";

interface RegisterProps {}
const Register: FC<RegisterProps> = ({}) => {
  const [componentToRender, setComponentToRender] = useState<any>(null);
  return (
    <section className="grid place-items-center pl-0 w-full">
      <div className="grid place-items-center mb-20 mt-32 pl-0 w-full">
        <UseUnAuthOnly skeletonLoader={<SkeletonLoader />}>
          {componentToRender ?? (
            <InitialForm setComponentToRender={setComponentToRender} />
          )}
        </UseUnAuthOnly>
      </div>
    </section>
  );
};
export default Register;

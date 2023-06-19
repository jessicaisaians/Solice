"use client";
import { FC, useState } from "react";
import InitialForm from "./components/InitialForm";

interface RegisterProps {}
const Register: FC<RegisterProps> = ({}) => {
  const [componentToRender, setComponentToRender] = useState<any>(null);
  return (
    <section className="grid place-items-center pl-0 w-full">
      <div className="grid place-items-center mb-20 mt-28 pl-0 w-full">
        {componentToRender ?? (
          <InitialForm setComponentToRender={setComponentToRender} />
        )}
      </div>
    </section>
  );
};
export default Register;

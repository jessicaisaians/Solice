"use client";
import { FC, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import UseUnAuthOnly from "../hooks/useUnAuthOnly";
import InitialForm from "./components/InitialForm";
import SkeletonLoader from "./components/SkeletonLoader";

interface RegisterProps {}
const Register: FC<RegisterProps> = () => {
  const [componentToRender, setComponentToRender] = useState<any>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [hasPassword, setHasPassword] = useState<boolean>(false);
  const [mobile, setMobile] = useState<string>("");
  const [noRedirect, setNoRedirect] = useState<boolean>(false);
  return (
    <section className="grid place-items-center pl-0 w-full">
      <div className="grid place-items-center mb-20 mt-32 pl-0 w-full">
        <LoginContext.Provider
          value={{
            hasPassword,
            setHasPassword,
            setComponentToRender,
            setIsLogin,
            isLogin,
            mobile,
            setMobile,
            noRedirect,
            setNoRedirect,
          }}
        >
          <UseUnAuthOnly
            skeletonLoader={<SkeletonLoader />}
            noRedirect={noRedirect}
          >
            {componentToRender ?? <InitialForm />}
          </UseUnAuthOnly>
        </LoginContext.Provider>
      </div>
    </section>
  );
};
export default Register;

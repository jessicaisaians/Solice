"use client";
import ButtonFollowCursor from "@/app/components/HomeContent/sections/Collections/ButtonFollowCursor";
import { LoginContext } from "@/app/contexts/LoginContext";
import {
  useCheckVerificationCodeMutation,
  usePasswordLoginLazyQuery,
  useSendVerificationCodeLazyQuery,
} from "@/generated/graphql";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, FormEvent, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import InfoForm from "./InfoForm";
import InitialForm from "./InitialForm";
import OTPInput from "./OTPInput";
import Timer from "./Timer";
export interface MobileValidationProps {}

const MobileValidation: FC<MobileValidationProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let {
    setComponentToRender,
    isLogin,
    setIsLogin,
    setNoRedirect,
    mobile,
    hasPassword,
    setHasPassword,
  } = useContext(LoginContext);

  const [otp, setOTP] = useState<string[]>(new Array(4).fill(""));
  const [err, setErr] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasTimerEnded, setHasTimerEnded] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const [checkCode, { loading: checkCodeLoading }] =
    useCheckVerificationCodeMutation();
  const [passwordLogin, { loading: checkPasswordLoading }] =
    usePasswordLoginLazyQuery();

  const [_, { refetch }] = useSendVerificationCodeLazyQuery();
  const handlePasswordLogin = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    //send password to server check if its ok
    const data = await passwordLogin({
      variables: {
        password,
        mobile: mobile ?? "",
      },
    });
    if (data.data?.passwordLogin.errors) {
      setErr(data.data?.passwordLogin?.errors?.[0]?.message);
    } else {
      setErr("");
      const result = await signIn("credentials", {
        id: data?.data?.passwordLogin?.user?.id,
        role: data?.data?.passwordLogin?.user?.role,
        redirect: false,
        callbackUrl: (searchParams.get("callbackUrl") as string) ?? "/",
      });
      if (result?.ok) {
        toast.success("ورود با موفقیت!");
        router.replace((searchParams.get("callbackUrl") as string) ?? "/");
      } else if (result?.error)
        toast.error(result?.error ?? "مشکلی رخ داده است.");
    }
  };
  const handleUsePassword = () => {
    setErr("");
    setHasTimerEnded(true);
    setUsePassword((prev) => !prev);
  };
  const handleVerifyCode = async (e?: FormEvent<HTMLFormElement>) => {
    try {
      e?.preventDefault();
      const data = await checkCode({
        variables: {
          code: otp.join(""),
          mobile: mobile ?? "",
        },
      });
      if (data.data?.checkVerificationCode.errors) {
        setErr(data.data?.checkVerificationCode?.errors?.[0]?.message);
      } else {
        setErr("");
        const result = await signIn("credentials", {
          id: data?.data?.checkVerificationCode.user?.id,
          role: data?.data?.checkVerificationCode.user?.role,
          redirect: false,
          callbackUrl: (searchParams.get("callbackUrl") as string) ?? "/",
        });
        if (result?.ok) {
          const isLogin = data.data?.checkVerificationCode?.isLogin;
          setIsLogin(isLogin ?? false);
          if (isLogin) {
            const callbackUrl = searchParams.get("callbackUrl") ?? "/";
            setHasPassword(
              data.data?.checkVerificationCode?.hasPassword ?? false
            );
            if (!data.data?.checkVerificationCode?.hasPassword) {
              setNoRedirect(true);
              setComponentToRender(<InfoForm />);
            } else {
              toast.success("ورود با موفقیت!");
              router.replace(callbackUrl as string);
            }
          } else {
            // navigate to Setup Info component
            setNoRedirect(true);
            setComponentToRender(<InfoForm />);
          }
        } else {
          toast.error(result?.error ?? "مشکلی رخ داده است.");
        }
      }
    } catch (err: any) {
      setErr(err?.message);
    }
  };
  const handleResendCode = async () => {
    const data = await refetch({
      mobile: mobile ?? "",
    });
    if (data?.data?.sendVerificationCode?.success) {
      setHasTimerEnded(false);
      setOTP(new Array(4).fill(""));
      setErr("");
    } else {
      setErr(data?.data?.sendVerificationCode?.errors?.[0]?.message ?? "");
    }
  };

  const loginOrRegisteTxt = isLogin === true ? "ورود" : "ثبت‌نام";
  return (
    <div>
      <div className="mb-7 text-center pt-0  ">
        <h1 className=" text-3xl font-bold text-white text-center   ">
          {isLogin
            ? usePassword
              ? `${loginOrRegisteTxt} با رمز عبور`
              : `${loginOrRegisteTxt} با کد`
            : "تایید شماره موبایل"}
        </h1>
        <div className="my-5 text-stone-400 text-base flex flex-col text-center">
          <div>
            {usePassword && isLogin
              ? ` رمز عبور حساب کاربری با شماره ${mobile} را وارد کنید `
              : `کد ارسال شده به شماره ${mobile} را وارد کنید`}
            <span className="mr-2">
              <button
                className="text-stone-500 text-base cursor-scale hover:text-stone-300 transition "
                onClick={() => {
                  setComponentToRender(<InitialForm />);
                }}
              >
                <FiEdit className="cursor-scale" />
              </button>
            </span>
          </div>

          {usePassword ? null : hasTimerEnded ? (
            <button
              className="bg-transparent border-stone-600 text-stone-200 hover:text-stone-600 transition-colors border-2 py-2 w-fit mt-4  px-3 rounded-lg text-sm"
              onClick={handleResendCode}
            >
              ارسال مجدد
            </button>
          ) : (
            <div className="mt-4 py-2">
              <Timer
                timerLimitInS={60 * 2}
                startTheTimer
                setTimerEnded={setHasTimerEnded}
              />
            </div>
          )}
        </div>
      </div>
      <form onSubmit={usePassword ? handlePasswordLogin : handleVerifyCode}>
        {usePassword ? (
          <div className="mb-6 ">
            <div className="relative z-0 w-full group">
              <input
                autoFocus
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPasswords ? "text" : "password"}
                className="block py-2.5 px-0 w-full text-base text-stone-300 bg-transparent border-0 border-b-2 border-stone-500 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-400 peer"
                placeholder=" "
                required
              />

              {showPasswords ? (
                <AiOutlineEyeInvisible
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-500 h-6 w-6"
                  onClick={() => setShowPasswords(false)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-500 h-6 w-6 "
                  onClick={() => setShowPasswords(true)}
                />
              )}
              <label
                htmlFor="password"
                className=" peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform  -translate-y-6 scale-75 top-2 -z-10 origin-right peer-focus:right-0 peer-focus:text-stone-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                رمز عبور{" "}
              </label>
            </div>
          </div>
        ) : (
          <OTPInput otp={otp} setOTP={setOTP} />
        )}
        {err && (
          <p role="alert" className="text-yellow-600  mt-4 text-xs">
            {err}
          </p>
        )}
        <div className="opacity-1 scale-1 rotate-0 translate-0 transform-none -mb-[40px] -mt-[10px] pb-0 text-center lg:text-base text-xl">
          <ButtonFollowCursor
            bgColor="#a8a29e"
            txtColor="#1c1917"
            classNamePostFix="register"
            link="/"
            btnText={usePassword ? "ورود" : "بررسی کد"}
            type="submit"
            isLoading={usePassword ? checkPasswordLoading : checkCodeLoading}
          />
        </div>
        {isLogin && hasPassword ? (
          <>
            {" "}
            <div className="relative text-white text-center border-t-2 border-stone-800 py-2 mt-8">
              <p className="absolute -translate-x-1/2  block -top-[12px]  left-1/2 h-auto text-center px-1 text-s  text-stone-700 bg-stone-950 ">
                یا
              </p>
            </div>
            <p
              className="text-center text-sm text-stone-500 py-4 hover:text-stone-400 transition-colors"
              onClick={handleUsePassword}
            >
              {usePassword
                ? `${loginOrRegisteTxt} با کد`
                : `${loginOrRegisteTxt} با رمز عبور`}
            </p>
          </>
        ) : null}
      </form>
    </div>
  );
};
export default MobileValidation;

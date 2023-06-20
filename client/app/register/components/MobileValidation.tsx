"use client";
import ButtonFollowCursor from "@/app/components/HomeContent/sections/Collections/ButtonFollowCursor";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { FiEdit } from "react-icons/fi";
import InfoForm from "./InfoForm";
import InitialForm, { FormValues } from "./InitialForm";
import OTPInput from "./OTPInput";
import Timer from "./Timer";
export interface MobileValidationProps {
  setComponentToRender: Dispatch<SetStateAction<any>>;
  currFormValues?: FormValues;
}

const MobileValidation: FC<MobileValidationProps> = ({
  setComponentToRender,
  currFormValues,
}) => {
  const [otp, setOTP] = useState<string[]>(new Array(4).fill(""));
  const [err, setErr] = useState<string>("");
  const [hasTimerEnded, setHasTimerEnded] = useState(false);
  const handleVerifyCode = (e?: FormEvent<HTMLFormElement>) => {
    try {
      e?.preventDefault();
      const code = otp.join("");
      if (code.length < 4) {
        throw new Error("وارد کردن کد الزامی می‌باشد.");
      } else {
        const currCode = "1234";
        if (code !== currCode) throw new Error("کد وارد شده نامعتبر می‌باشد");
        else {
          setErr("");
          //   login
          setComponentToRender(<InfoForm />);
        }
      }
    } catch (err: any) {
      setErr(err?.message);
    }
  };
  const handleResendCode = () => {
    setHasTimerEnded(false);
  };
  return (
    <div>
      <div className="mb-7 text-center pt-0  ">
        <h1 className=" text-3xl font-bold text-white text-center   ">
          تایید شماره موبایل
        </h1>
        <div className="my-4 text-stone-400 text-base flex flex-col text-center">
          <div>
            {`کد ارسال شده به شماره ${currFormValues?.mobile} را وارد کنید`}
            <span className="mr-2">
              <button
                className="text-stone-500 text-base cursor-scale hover:text-stone-300 transition "
                onClick={() => {
                  setComponentToRender(
                    <InitialForm
                      setComponentToRender={setComponentToRender}
                      currFormValues={currFormValues}
                    />
                  );
                }}
              >
                <FiEdit className="cursor-scale" />
              </button>
            </span>
          </div>
          {hasTimerEnded ? (
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
      <form onSubmit={handleVerifyCode}>
        <OTPInput otp={otp} setOTP={setOTP} />
        {err && (
          <p role="alert" className="text-red-700 mt-4 text-xs">
            {err}
          </p>
        )}
        <div className="opacity-1 scale-1 rotate-0 translate-0 transform-none -mb-[40px] -mt-[16px] pb-0 text-center lg:text-base text-xl">
          <ButtonFollowCursor
            bgColor="#a8a29e"
            txtColor="#1c1917"
            classNamePostFix="register"
            link="/"
            btnText="بررسی کد"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};
export default MobileValidation;

"use client";
import { LoginContext } from "@/app/contexts/LoginContext";
import { useSendVerificationCodeLazyQuery } from "@/generated/graphql";
import { FC, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ButtonFollowCursor from "../../components/HomeContent/sections/Collections/ButtonFollowCursor";
import MobileValidation from "./MobileValidation";

export interface InitialFormProps {}

const InitialForm: FC<InitialFormProps> = () => {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  let { setComponentToRender, setIsLogin, mobile, setMobile, setHasPassword } =
    useContext(LoginContext);
  const [sendVerificationCode, { loading }] = useSendVerificationCodeLazyQuery({
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    reset({ mobile });
  }, [mobile, reset]);

  const onSubmit: SubmitHandler<any> = async ({ mobile }) => {
    const { data } = await sendVerificationCode({
      variables: {
        mobile,
      },
    });
    toast.success("کد ارسال شد.");
    if (data?.sendVerificationCode?.errors) {
      setError(data?.sendVerificationCode?.errors?.[0]?.path, {
        type: "custom",
        message: data?.sendVerificationCode?.errors?.[0]?.message,
      });
    } else if (data?.sendVerificationCode?.success) {
      setIsLogin(data?.sendVerificationCode?.isLogin ?? false);
      setMobile(mobile);
      setHasPassword(data?.sendVerificationCode?.hasPassword ?? false);
      setComponentToRender(
        <MobileValidation
        />
      );
    }
  };
  return (
    <>
      <div className="mb-12 text-center pt-0  ">
        <h1 className=" text-3xl font-bold text-white text-center   ">
          ورود | ثبت‌نام
        </h1>
      </div>
      <form
        className="flex flex-col gap-5 relative min-w-[350px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative z-0 w-full mb-3 group">
          <input
            autoFocus
            id="mobile"
            className="block py-2.5 px-0 w-full text-base text-stone-300 bg-transparent border-0 border-b-2 border-stone-500 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-400 peer"
            placeholder=" "
            {...register("mobile", {
              required: {
                value: true,
                message: "وارد کردن شماره موبایل الزامی می‌باشد",
              },
              pattern: {
                value: /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/,
                message: "شماره موبایل وارد شده نامعتبر می‌باشد.",
              },
            })}
          />
          <label
            htmlFor="mobile"
            className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform  -translate-y-6 scale-75 top-2 -z-10 origin-right peer-focus:right-0 peer-focus:text-stone-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            شماره موبایل
          </label>
          {errors.mobile && (
            <p role="alert" className="text-yellow-600  mt-4 text-xs">
              {errors.mobile.message?.toString()}
            </p>
          )}
        </div>
        <div className="opacity-1 scale-1 rotate-0 translate-0 transform-none -mb-[40px] -mt-[11px] pb-0 text-center lg:text-base text-xl">
          <ButtonFollowCursor
            bgColor="#a8a29e"
            txtColor="#1c1917"
            classNamePostFix="register"
            link="/"
            btnText="ادامه"
            type="submit"
            isLoading={loading}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </>
  );
};
export default InitialForm;

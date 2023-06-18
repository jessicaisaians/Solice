"use client";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";
import ButtonFollowCursor from "../components/HomeContent/sections/Collections/ButtonFollowCursor";

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <section className="grid place-items-center pl-0 w-full">
      <div className="grid place-items-center mb-20 mt-28 pl-0 w-full">
        <div className="mb-7 text-center pt-0  ">
          <h1 className=" text-3xl font-bold text-white text-center   ">
            ثبت‌نام
          </h1>
          <div className="my-4 text-stone-400 text-base  text-center">
            حساب کاربری دارید؟
            <span className="mr-3">
              <Link
                href={"/login"}
                className="text-stone-500 border-b-2 text-base  border-stone-400 "
              >
                ورود
              </Link>
            </span>
          </div>
        </div>

        <form
          className="flex flex-col gap-5 relative min-w-[350px]"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="email"
              className="block py-2.5 px-0 w-full text-base text-stone-300 bg-transparent border-0 border-b-2 border-stone-500 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-400 peer"
              placeholder=" "
              {...register("email", {
                required: "وارد کردن آدرس ایمیل الزامی می‌باشد",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "آدرس ایمیل وارد شده نامعتبر می‌باشد.",
                },
              })}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform  -translate-y-6 scale-75 top-2 -z-10 origin-right peer-focus:right-0 peer-focus:text-stone-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              آدرس ایمیل
            </label>
            {errors.email && (
              <p role="alert" className="text-red-700 mt-4 text-xs">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="mobile"
              className="block py-2.5 px-0 w-full text-base text-stone-300 bg-transparent border-0 border-b-2 border-stone-500 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-400 peer"
              placeholder=" "
              {...register("mobile", {
                required: "وارد کردن شماره موبایل الزامی می‌باشد",
                pattern: {
                  value: /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/,
                  message: "شماره موبایل وارد شده نامعتبر می‌باشد.",
                },
              })}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform  -translate-y-6 scale-75 top-2 -z-10 origin-right peer-focus:right-0 peer-focus:text-stone-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              شماره موبایل
            </label>
            {errors.mobile && (
              <p role="alert" className="text-red-700 mt-4 text-xs">
                {errors.mobile.message?.toString()}
              </p>
            )}
          </div>
          <div className="opacity-1 scale-1 rotate-0 translate-0 transform-none -mb-[40px] -mt-[11px] pb-0 text-center lg:text-base text-xl">
            <ButtonFollowCursor
              bgColor="#a8a29e"
              txtColor="#1c1917"
              classNamePostFix="register"
              link="/e"
              btnText="ثبت‌نام"
            />
          </div>
        </form>
      </div>
    </section>
  );
};
export default Register;

"use client";
import ButtonFollowCursor from "@/app/components/HomeContent/sections/Collections/ButtonFollowCursor";
import {
  calcAgeFromYYYMMDD,
  convertYYYYMMDDToEpoch,
  isValidDate,
  numberInRange,
} from "@/app/utils";
import moment from "jalali-moment";
import { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaAsterisk } from "react-icons/fa";
enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}
interface InfoFormProps {}
interface FormValues {
  fName: string;
  lName: string;
  email: string;
  gender: GenderEnum;
  password: string;
  confPassword: string;
  promoCode: string;
  birthDate: string;
}
const InfoForm: FC<InfoFormProps> = ({}) => {
  const [birthDateErr, setBirthDateErr] = useState("");
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const {
    reset,
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<any> = ({
    fName,
    gender,
    lName,
    confPassword,
    password,
    promoCode,
    email,
  }) => {
    const birthDateMs = convertYYYYMMDDToEpoch({ y: year, m: month, d: day });
    if (
      (year > 0 || month > 0 || day > 0) &&
      !isValidDate({ y: year, m: month, d: day })
    ) {
      setBirthDateErr("تاریخ نامعتبر");
    } else {
      setBirthDateErr("");
    }
    if (confPassword !== password)
      setError("confPassword", {
        type: "custom",
        message: "رمز عبور و تکرار رمز عبور باید یکسان باشند",
      });

    setFocus("confPassword");
    alert(gender);
  };
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const handleOnChangeYear = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 4) {
      const last4Digits = parseInt(value.slice(-4));
      const max = parseInt(moment().locale("fa").format("YYYY"));
      const min = parseInt(moment().locale("fa").format("YYYY")) - 100;
      if (min > last4Digits) {
        setYear(min);
      } else if (max < last4Digits) {
        setYear(max);
      } else {
        setYear(last4Digits);
      }
    } else {
      setYear(parseInt(e.target.value));
    }
  };
  const handleOnMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valInt =
      value.length <= 2 ? parseInt(value) : parseInt(value.slice(-2));
    const min = 1;
    const max = 12;

    if (valInt > max) return setMonth(max);
    if (valInt < min) return setMonth(min);
    else setMonth(valInt);
  };
  const handleOnDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valInt =
      value.length <= 2 ? parseInt(value) : parseInt(value.slice(-2));
    const min = 1;
    const max = 31;
    if (valInt > max) return setDay(max);
    if (valInt < min) return setDay(min);
    else setDay(valInt);
  };

  return (
    <div>
      <div className="mb-7 text-center pt-0  ">
        <h1 className=" text-3xl font-bold text-white text-center mb-10">
          اطلاعات تکمیلی
        </h1>
      </div>
      <form
        className="flex flex-col gap-5 relative min-w-[350px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-sm text-stone-500">عنوان اجتماعی</p>
        <div className="relative z-0 w-[350px]  mb-4 group text-stone-400 ">
          <label htmlFor="field-male" className="ml-8">
            <input
              checked
              {...register("gender")}
              type="radio"
              value={GenderEnum.male}
              id="field-male"
              className="accent-blue-300 focus:accent-blue-400 ml-3"
            />
            آقا
          </label>{" "}
          <label htmlFor="field-female" className="ml-8">
            <input
              {...register("gender")}
              type="radio"
              value={GenderEnum.female}
              id="field-female"
              className="accent-blue-300 focus:accent-blue-400 ml-3"
            />
            خانم
          </label>
          {/* <label htmlFor="field-sun">
            <input
              {...register("gender")}
              type="radio"
              value="sun"
              id="field-sun"
            />
            Sunny
          </label> */}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            id="fName"
            className="block py-2.5 px-0 w-full text-base text-stone-300 bg-transparent border-0 border-b-2 border-stone-500 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-400 peer"
            placeholder=" "
            {...register("fName", {
              pattern: {
                value: /^[a-zA-Z\u0600-\u06FF\s]+$/,
                message: "نام وارد شده نامعتبر می‌باشد.",
              },
              maxLength: {
                message: "نام نمی‌تواند بیشتر از 20 کاراکتر باشد.",
                value: 20,
              },
            })}
          />
          <label
            htmlFor="fName"
            className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform  -translate-y-6 scale-75 top-2 -z-10 origin-right peer-focus:right-0 peer-focus:text-stone-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            نام
          </label>
          {errors.fName && (
            <p role="alert" className="text-red-700 mt-4 text-xs">
              {errors.fName.message?.toString()}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            id="lName"
            className="block py-2.5 px-0 w-full text-base text-stone-300 bg-transparent border-0 border-b-2 border-stone-500 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-400 peer"
            placeholder=" "
            {...register("lName", {
              pattern: {
                value: /^[a-zA-Z\u0600-\u06FF\s]+$/,

                message: "نام حانواردگی وارد شده نامعتبر می‌باشد.",
              },
              maxLength: {
                message: "نام خانوادگی نمی‌تواند بیشتر از 20 کاراکتر باشد.",
                value: 20,
              },
            })}
          />
          <label
            htmlFor="lName"
            className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform  -translate-y-6 scale-75 top-2 -z-10 origin-right peer-focus:right-0 peer-focus:text-stone-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            نام خانوادگی
          </label>
          {errors.lName && (
            <p role="alert" className="text-red-700 mt-4 text-xs">
              {errors.lName.message?.toString()}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            id="email"
            type="email"
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
            className="flex peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform  -translate-y-6 scale-75 top-2 -z-10 origin-right peer-focus:right-0 peer-focus:text-stone-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            <p>آدرس ایمیل</p>
            <FaAsterisk className="fill-red-800 h-2" />
          </label>
          {errors.email && (
            <p role="alert" className="text-red-700 mt-4 text-xs">
              {errors.email.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-6 ">
          <div className="relative z-0 w-full group">
            <input
              id="password"
              type={showPasswords ? "text" : "password"}
              className="block py-2.5 px-0 w-full text-base text-stone-300 bg-transparent border-0 border-b-2 border-stone-500 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-400 peer"
              placeholder=" "
              {...register("password", {
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                  message:
                    "رمز عبور باید حداقل شامل یک عدد، یک حرف بزرگ، یک حرف کوچک و یک کاراکتر خاص باشد و طول آن حداقل 8 کاراکتر باشد",
                },
                required: {
                  value: true,
                  message: "وارد کردن رمز عبور الزامی می‌باشد",
                },
              })}
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
              className="flex peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform  -translate-y-6 scale-75 top-2 -z-10 origin-right peer-focus:right-0 peer-focus:text-stone-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <p>رمز عبور</p> <FaAsterisk className="fill-red-800 h-2" />
            </label>
          </div>
          {errors.password && (
            <p
              role="alert"
              className="text-red-700 mt-4 text-xs max-w-[350px]  leading-6"
            >
              {errors.password.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-6 ">
          <div className="relative z-0 w-full  group">
            <input
              id="confPassword"
              type={showPasswords ? "text" : "password"}
              className="relative block py-2.5 px-0 w-full text-base text-stone-300 bg-transparent border-0 border-b-2 border-stone-500 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-400 peer"
              placeholder=" "
              {...register("confPassword", {
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                  message:
                    "رمز عبور باید حداقل شامل یک عدد، یک حرف بزرگ، یک حرف کوچک و یک کاراکتر خاص باشد و طول آن حداقل 8 کاراکتر باشد",
                },
                required: {
                  value: true,
                  message: "وارد کردن تکرار رمز عبور الزامی می‌باشد",
                },
              })}
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
              htmlFor="confPassword"
              className="flex peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform  -translate-y-6 scale-75 top-2 -z-10 origin-right peer-focus:right-0 peer-focus:text-stone-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <p>تکرار رمز عبور</p> <FaAsterisk className="fill-red-800 h-2" />
            </label>
          </div>
          {errors.confPassword && (
            <p
              role="alert"
              className="text-red-700 mt-4 text-xs max-w-[350px]  leading-6"
            >
              {errors.confPassword.message?.toString()}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            id="promoCode"
            className="block py-2.5 px-0 w-full text-base text-stone-300 bg-transparent border-0 border-b-2 border-stone-500 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-400 peer"
            placeholder=" "
            {...register("promoCode", {
              pattern: {
                value: /^\d+$/,
                message: "کد وارد شده نامعتبر می‌باشد.",
              },
            })}
          />

          <label
            htmlFor="promoCode"
            className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform  -translate-y-6 scale-75 top-2 -z-10 origin-right peer-focus:right-0 peer-focus:text-stone-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            کد معرف
          </label>
          {errors.promoCode && (
            <p role="alert" className="text-red-700 mt-4 text-xs">
              {errors.promoCode.message?.toString()}
            </p>
          )}
        </div>
        <p className="text-sm text-stone-500">تاریخ تولد</p>
        <div className="flex w-[350px] gap-5 items-end justify-start">
          <div className="flex flex-col">
            <label
              htmlFor="day"
              className=" text-xs text-stone-600  mb-2 text-center  "
            >
              روز
            </label>
            <input
              id="day"
              //   max={31}
              //   min={1}
              //   maxLength={2}
              //   minLength={2}
              type="number"
              onChange={handleOnDayChange}
              value={day}
              style={{
                direction: "ltr",
              }}
              className=" w-12 h-12 border-2  rounded-xl bg-transparent outline-none text-center font-semibold  text-lg border-stone-500 focus:border-stone-400 fcus:text-stone-700  text-stone-400 transition spin-button-none "
            />{" "}
          </div>
          <div className="rotate-[30deg] bg-stone-600 h-10 w-[3px] mb-1 rounded-lg" />
          <div className="flex flex-col">
            <label
              htmlFor="day"
              className=" text-xs text-stone-600  mb-2 text-center  "
            >
              ماه
            </label>
            <input
              type="number"
              //   min={1}
              //   max={12}
              //   maxLength={2}
              //   minLength={2}
              value={month}
              onChange={handleOnMonthChange}
              style={{
                direction: "ltr",
              }}
              className=" w-12 h-12 border-2  rounded-xl bg-transparent outline-none text-center font-semibold  text-lg border-stone-500 focus:border-stone-400 fcus:text-stone-700  text-stone-400 transition spin-button-none "
            />
          </div>
          <div className="rotate-[30deg] bg-stone-600 h-10 mb-1 w-[3px] rounded-lg" />
          <div className="flex flex-col">
            <label
              htmlFor="day"
              className=" text-xs text-stone-600  mb-2 text-center  "
            >
              سال
            </label>
            <input
              //   ref={activeOtpIndex === index ? inputRef : null}
              //   key={index}
              //   maxLength={4}
              //   minLength={4}
              //   max={parseInt(moment().locale("fa").format("YYYY"))}
              //   min={parseInt(moment().locale("fa").format("YYYY")) - 100}
              type="number"
              value={year}
              onChange={handleOnChangeYear}
              style={{
                direction: "ltr",
              }}
              className=" w-12 h-12 border-2  rounded-xl bg-transparent outline-none text-center font-semibold  text-lg border-stone-500 focus:border-stone-400 fcus:text-stone-700  text-stone-400 transition spin-button-none "
            />
          </div>
          <p className="text-stone-500 h-8 mb-1">
            {numberInRange(
              calcAgeFromYYYMMDD({ y: year, m: month, d: day }),
              1,
              100
            ) ? (
              <div className="flex text-base">
                <span className="text-stone-600 text-sm ml-1">سن:</span>
                <p>
                  {`${calcAgeFromYYYMMDD({ y: year, m: month, d: day })} سال`}
                </p>
              </div>
            ) : (
              ""
            )}
          </p>
        </div>
        <p
          role="alert"
          className="text-red-700  h-8 mb-1 text-xs max-w-[350px]  leading-6"
        >
          {birthDateErr}
        </p>
        <div className="opacity-1 scale-1 rotate-0 translate-0 transform-none -mb-[40px] -mt-[11px] pb-0 text-center lg:text-base text-xl">
          <ButtonFollowCursor
            bgColor="#a8a29e"
            txtColor="#1c1917"
            classNamePostFix="register"
            link="/"
            btnText="ثبت‌نام"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};
export default InfoForm;

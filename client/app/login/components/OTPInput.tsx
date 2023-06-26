"use client";
import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface OTPInputProps {
  setOTP: Dispatch<SetStateAction<string[]>>;
  otp: string[];
}
let currentOtpIndex: number = 0;
const OTPInput: FC<OTPInputProps> = ({ otp, setOTP }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);

  const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOtpIndex] = value.substring(value.length - 1);
    // if (!value) setActiveOtpIndex(currentOtpIndex - 1);
    // else
    if (value) setActiveOtpIndex(currentOtpIndex + 1);
    setOTP(newOTP);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    currentOtpIndex = index;
    if (e.key === "Tab") {
      e.preventDefault();
      setActiveOtpIndex(currentOtpIndex + 1);
    }
    if (e.key === "Backspace" && !(e.target as HTMLInputElement).value) {
      e.preventDefault();
      setActiveOtpIndex(currentOtpIndex - 1);
    }
  };
  useEffect(() => {
    inputRef?.current?.focus();
    inputRef?.current?.select()
  }, [activeOtpIndex]);
  return (
    <div
      className=" flex justify-between min-w-[350px]"
      style={{
        direction: "ltr",
      }}
    >
      {otp.map((_, index) => (
        <input
          ref={activeOtpIndex === index ? inputRef : null}
          key={index}
          type="number"
          value={otp[index]}
          onChange={(e) => handleOnChange(e)}
          onKeyDown={(e) => onKeyDown(e, index)}
          style={{
            direction: "ltr",
          }}
          className=" w-14 h-14 border-2  rounded-xl bg-transparent outline-none text-center font-semibold  text-xl border-stone-400 focus:border-stone-700 fcus:text-stone-700  text-stone-400 transition spin-button-none "
        />
      ))}
    </div>
  );
};
export default OTPInput;

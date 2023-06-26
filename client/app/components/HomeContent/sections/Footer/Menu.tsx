"use client";
import Link from "next/link";
import { FC } from "react";
import ButtonFollowCursor from "../Collections/ButtonFollowCursor";
interface MenuProps {
  menuOnly?: boolean;
}

const Menu: FC<MenuProps> = ({ menuOnly }) => {
  return (
    <div className="flex-col hidden lg:flex ">
      <div className="gap-32  flex-wrap flex flex-col justify-between z-40 text-white absolute bottom-10 right-[5.4rem] left-[5.4rem]">
        {!menuOnly && (
          <div className="flex flex-col items-center ">
            <h6 className="text-white text-4xl leading-[3.6rem] text-center">
              همین حالا <span className="text-[#b3dfff]">ثبت‌نام</span> کنید!
            </h6>
            <div className="end_trigger  opacity-1 z-20 scale-1 rotate-0 translate-0 transform-none pb-0 text-center lg:text-base text-xl">
              <ButtonFollowCursor
                classNamePostFix="create_account"
                txtColor="#3d7299"
                bgColor="#fff"
                padding="16px 32px 16px"
                link="/login"
                btnText="ایجاد حساب کاربری"
              />
            </div>
          </div>
        )}
        <div className="flex-wrap flex  justify-between z-40 text-white relative  w-full">
          <ul className="flex flex-col gap-4 text-[13px]">
            <li>
              <Link href={"/shop"} target="_blank">
                فروشگاه
              </Link>
            </li>
            <li>
              <Link href={"/faq"} target="_blank">
                سوالات متداول
              </Link>
            </li>
            <li>
              <Link href={"/terms-and-conditions"}>قوانین و مقررات</Link>
            </li>
          </ul>
          <div className="flex flex-col gap-5 text-sm">
            <div className="flex flex-wrap gap-6">
              <Link
                href="https://api.whatsapp.com/send?phone=989128175615"
                target="_blank"
              >
                <svg
                  fill="#fff"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 17.877 17.902"
                >
                  <defs></defs>
                  <path
                    id="Path_320"
                    data-name="Path 320"
                    className="cls-1"
                    d="M8.893-511.545a8.956,8.956,0,0,0-3.476.994,8.92,8.92,0,0,0-3.893,3.973,7.9,7.9,0,0,0-.648,1.7,7.659,7.659,0,0,0-.277,2.2c0,.448.018.931.042,1.12a9,9,0,0,0,1.393,3.826l.252.389L1.731-495.7c-.308.907-.553,1.649-.546,1.656s.77-.231,1.7-.529,1.7-.543,1.722-.543a2.564,2.564,0,0,1,.319.182c.161.1.5.28.746.4a8.939,8.939,0,0,0,7.169.255,9.027,9.027,0,0,0,5.363-6.056,7.467,7.467,0,0,0,.273-2.272,7.468,7.468,0,0,0-.273-2.272,9.025,9.025,0,0,0-6.668-6.465,8.39,8.39,0,0,0-1.8-.2C9.348-511.552,8.97-511.552,8.893-511.545Zm-2.135,4.152a.539.539,0,0,1,.182.193c.1.186.956,2.233.98,2.359.032.158-.126.427-.473.819-.364.41-.441.539-.41.686a7.449,7.449,0,0,0,1.369,1.813,5.836,5.836,0,0,0,2.464,1.467c.27.017.364-.056.777-.6.186-.249.382-.5.441-.553a.5.5,0,0,1,.56-.08c.287.109,2.048.966,2.174,1.061l.119.087-.021.371a1.924,1.924,0,0,1-1.267,1.876,3.167,3.167,0,0,1-2.783-.046,8.772,8.772,0,0,1-3.886-2.419,12.767,12.767,0,0,1-1.568-1.876,4.454,4.454,0,0,1-1.057-3.045,2.817,2.817,0,0,1,.868-1.831,1.355,1.355,0,0,1,1.092-.343A1.273,1.273,0,0,1,6.757-507.393Z"
                    transform="translate(-0.6 511.55)"
                  ></path>
                </svg>
              </Link>
              <Link href="https://t.me/Soliceofficial" target="_blank">
                <svg
                  fill="#fff"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  id="telegram"
                  width="16"
                  height="16"
                  viewBox="0 0 17.617 14.567"
                >
                  <defs></defs>
                  <path
                    id="Path_313"
                    data-name="Path 313"
                    className="cls-1"
                    d="M87.8,152.4s7.791-3.2,10.494-4.324c1.036-.45,4.549-1.892,4.549-1.892s1.621-.63,1.486.9c-.045.631-.405,2.837-.766,5.224-.54,3.378-1.126,7.071-1.126,7.071s-.09,1.036-.856,1.216a3.7,3.7,0,0,1-2.252-.811c-.18-.135-3.378-2.162-4.549-3.153a.853.853,0,0,1,.045-1.441c1.621-1.486,3.558-3.333,4.729-4.5.54-.54,1.081-1.8-1.171-.27-3.2,2.207-6.35,4.279-6.35,4.279a2.646,2.646,0,0,1-2.072.045c-1.351-.405-2.927-.946-2.927-.946S85.953,153.122,87.8,152.4Z"
                    transform="translate(-86.72 -146.058)"
                  ></path>
                </svg>
              </Link>
              <Link
                href={"https://www.instagram.com/jesssica_98/?hl=en"}
                target="_blank"
              >
                <svg
                  fill="#fff"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Group_677"
                  data-name="Group 677"
                  width="16"
                  height="16"
                  viewBox="0 0 15.891 15.891"
                >
                  <defs></defs>
                  <path
                    id="Path_197"
                    data-name="Path 197"
                    className="cls-1"
                    d="M6147.434-642.6H6136.2a2.33,2.33,0,0,0-2.327,2.328v11.235a2.329,2.329,0,0,0,2.327,2.327h11.236a2.328,2.328,0,0,0,2.328-2.327v-11.235A2.329,2.329,0,0,0,6147.434-642.6Zm-5.618,12.373a4.425,4.425,0,0,1-4.426-4.427,4.425,4.425,0,0,1,4.426-4.427,4.427,4.427,0,0,1,4.427,4.427A4.427,4.427,0,0,1,6141.816-630.228Zm5.12-8.5a1.017,1.017,0,0,1-1.017-1.018,1.017,1.017,0,0,1,1.017-1.018,1.017,1.017,0,0,1,1.018,1.018A1.017,1.017,0,0,1,6146.937-638.728Z"
                    transform="translate(-6133.871 642.601)"
                  ></path>
                  <ellipse
                    id="Ellipse_40"
                    data-name="Ellipse 40"
                    className="cls-1"
                    cx="2.75"
                    cy="2.75"
                    rx="2.75"
                    ry="2.75"
                    transform="translate(5.194 5.229)"
                  ></ellipse>
                </svg>
              </Link>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="text-[12px] leading-6 text-slate-200 opacity-75">
                <Link href={"/contact-us"}>تماس با ما</Link>
              </li>
              <li className="text-[12px] leading-6 text-slate-200 opacity-75">
                <Link href={"/about-us"}>درباره ما</Link>
              </li>
            </ul>
          </div>
          <ul className="flex flex-col  gap-4 text-sm">
            <li className="underline underline-offset-8  tracking-wider">
              info@solice.com
            </li>
            <li className="text-[12px] leading-8 text-slate-200 opacity-75">
              {`تهران میدان رسالت ابتدای خیابان مدنی جنب شیرینی فروشی گندم پلاک ${(1508).toLocaleString(
                "fa",
                { useGrouping: false }
              )}`}
              <br />
              {`${(0).toLocaleString("fa", {
                useGrouping: false,
              })}${(21).toLocaleString("fa", {
                useGrouping: false,
              })}-${(88442053).toLocaleString("fa", { useGrouping: false })}`}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Menu;

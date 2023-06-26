"use client";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiCog, BiDetail, BiReceipt, BiStar, BiUser } from "react-icons/bi";

interface ProfileBtnProps {}
const menuItems = [
  {
    title: "تنظیمات",
    link: "/account/settings",
    icon: <BiCog size={18} fill="#8c8c8c" />,
  },
  {
    title: "سفارش‌ها",
    link: "/account/orders",
    icon: <BiDetail size={18} fill="#8c8c8c" />,
  },
  {
    title: "رسیدهای مالی",
    link: "/account/payments",
    icon: <BiReceipt size={18} fill="#8c8c8c" />,
  },
  {
    title: "آیتم‌های محبوب",
    link: "account/fav",
    icon: <BiStar size={18} fill="#8c8c8c" />,
  },
];
const ProfileBtn: FC<ProfileBtnProps> = ({}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOnClick = () => setOpenMenu((prev) => !prev);
  const { data: session, status } = useSession();
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!e?.target?.classList?.contains("safe-zone")) setOpenMenu(false);
    };
    if (openMenu) {
      window.addEventListener("click", handleClick);
    }
  }, [openMenu]);
  return (
    <>
      <div
        className={clsx(
          status === "loading" ? "opacity-0" : "opacity-1 safe-zone",
          "transition-opacity"
        )}
      >
        {!session?.user ? (
          <Link
            href="/login"
            className="z-40 cursor-scale text-sm text-white fixed top-4 left-[54px] h-[3.4rem] py-[0.4rem] flex items-center justify-center"
          >
            ورود | ثبت‌نام
          </Link>
        ) : (
          <div className="profile relative safe-zone" onClick={handleOnClick}>
            <div className="safe-zone">
              <BiUser className="safe-zone" />
            </div>

            {session?.user && (
              <div
                className={clsx(
                  openMenu
                    ? "opacity-1 pointer-events-auto safe-zone"
                    : "opacity-0 pointer-events-none",
                  "transition-opacity absolute bg-[#1a1b1c] py-5  px-3 h-auto w-fit min-w-[200px] max-w-full top-[calc(100%+14px)] rounded-md left-0 z-50"
                )}
              >
                <div className="triangle safe-zone"></div>
                <ul className="flex flex-col gap-5 text-sm safe-zone ">
                  {menuItems.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-center safe-zone"
                    >
                      <Link href={item.link} className="safe-zone">
                        {item.icon}
                      </Link>
                      <Link href={item.link} className="pr-3 safe-zone">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                  <li
                    className="flex items-center safe-zone"
                    onClick={() => signOut()}
                  >
                    <AiOutlineLogout
                      size={18}
                      fill="#8c8c8c"
                      className="safe-zone"
                    />
                    <p className="mr-3 cursor-scale safe-zone">خروج</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default ProfileBtn;

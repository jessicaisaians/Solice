import clsx from "clsx";
import "locomotive-scroll/dist/locomotive-scroll.css";
import localFont from "next/font/local";
import HomeContent from "./components/HomeContent";
import Menu from "./components/HomeContent/sections/Footer/Menu";
import MenuMobile from "./components/HomeContent/sections/Footer/MenuMobile";
import "./globals.css";
const myFont = localFont({ src: "./../public/iran-sans.ttf" });

export const metadata = {
  title: "Solice",

  description: "فروشگاه اینترنتی لباس سولیس",
};

export default function RootLayout({
  children,
  
}: {
  children: React.ReactNode;

}) {
  
  return (
    <html lang="fa" dir="rtl" className="bg-stone-950">
      <body className={clsx(myFont.className, "bg-stone-950")}>
        <HomeContent>
          {children}
          {/* <Menu menuOnly /> */}
          {/* <MenuMobile menuOnly /> */}

        </HomeContent>
      </body>
    </html>
  );
}

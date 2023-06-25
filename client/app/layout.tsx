import clsx from "clsx";
import "locomotive-scroll/dist/locomotive-scroll.css";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import HomeContent from "./components/HomeContent";
import "./globals.css";
import ApolloClientProvider from "./providers/ApolloClientProvider";
import NextAuthSessionProvider from "./providers/NextAuthSessionProvider";
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
        <Toaster
          toastOptions={{
            style: {
              direction: "rtl",
              zIndex: "9999",
              color: "#f5f5f4",
              backgroundColor: "#262626",
            },
          }}
        />
        <NextAuthSessionProvider>
          <ApolloClientProvider>
            <HomeContent>
              {children}
              {/* <Menu menuOnly /> */}
              {/* <MenuMobile menuOnly /> */}
            </HomeContent>
          </ApolloClientProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

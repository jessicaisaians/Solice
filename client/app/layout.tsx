import "locomotive-scroll/dist/locomotive-scroll.css";
import { Noto_Sans } from "next/font/google";
import Cursor from "./components/Cursor";
import "./globals.css";

const inter = Noto_Sans({ weight: "300", subsets: ["latin"] });

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
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <Cursor />
        {children}
      </body>
    </html>
  );
}

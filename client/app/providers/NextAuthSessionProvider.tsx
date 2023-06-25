"use client";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";
interface ProviderProps {
  children: any;
}

const NextAuthSessionProvider: FC<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default NextAuthSessionProvider;

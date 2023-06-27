"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC } from "react";

interface UseAuthOnlyProps {
  children?: any;
  skeletonLoader?: any;
}

const UseAuthOnly: FC<UseAuthOnlyProps> = ({ children, skeletonLoader }) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/protected/client");
    },
  });
  return (
    <>
      {status === "loading"
        ? skeletonLoader??null
        : status === "authenticated"
        ? children
        : null}
    </>
  );
};
export default UseAuthOnly;

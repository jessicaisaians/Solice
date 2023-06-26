"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface UseUnAuthOnlyProps {
  children?: any;
  skeletonLoader?: any;
}

const UseUnAuthOnly: FC<UseUnAuthOnlyProps> = ({
  children,
  skeletonLoader,
}) => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status, router]);
  return (
    <>
      {status === "loading"
        ? skeletonLoader
        : status === "unauthenticated"
        ? children
        : null}
    </>
  );
};
export default UseUnAuthOnly;

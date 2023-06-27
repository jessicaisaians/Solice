"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect } from "react";

interface UseUnAuthOnlyProps {
  children?: any;
  skeletonLoader?: any;
  noRedirect?: boolean;
}

const UseUnAuthOnly: FC<UseUnAuthOnlyProps> = ({
  children,
  skeletonLoader,
  noRedirect,
}) => {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = useCallback(
    () => searchParams.get("callbackUrl") ?? "/",
    [searchParams]
  );
  useEffect(() => {
    if (status === "authenticated" && !noRedirect)
      router.replace(callbackUrl());
  }, [status, router, callbackUrl, noRedirect]);
  return (
    <>
      {status === "loading"
        ? skeletonLoader ?? null
        : status === "unauthenticated" ||
          (noRedirect && status === "authenticated")
        ? children
        : null}
    </>
  );
};
export default UseUnAuthOnly;

"use client";
import UseAuthOnly from "@/app/hooks/UseAuthOnly";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { data: session } = useSession();
  return (
    <section className="py-24">
      <div className="container">
        <UseAuthOnly
          skeletonLoader={
            <>
              <p className="text-white"> Loafiong =---</p>
            </>
          }
        >
          <h1 className="text-3xl text-white font-bold underline">
            client side protectd page
          </h1>
          <p className="text-xl text-white ">
            Youre logged in as
            {session?.user?.id}
          </p>
          <p className="text-xl text-white " onClick={() => signOut()}>
            logout
          </p>
        </UseAuthOnly>
      </div>
    </section>
  );
};
export default Page;

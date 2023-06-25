"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/register?callbackUrl=/protected/client");
    },
  });
  return (
    <section className="py-24">
      <div className="container">
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
      </div>
    </section>
  );
};
export default Page;

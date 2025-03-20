"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
const Page = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <section className="text-center mt-20">
        <h1 className="text-2xl font-bold">Неавторизовано</h1>
        <p className="text-xl">
          <Link href="/auth/login" className="underline">
            Ввійдіть
          </Link>{" "}
          в аккаунт для продовження{" "}
        </p>
      </section>
    );
  }
  return <div>{status}</div>;
};

export default Page;

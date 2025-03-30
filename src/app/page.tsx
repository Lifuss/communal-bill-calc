"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "./(components)/Logo";

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

  return (
    <section className="mx-auto mt-20 rounded-2xl border-2 border-gray-300 w-fit p-5 flex flex-col justify-center items-center">
      <h1 className="text-2xl">Вітаю вас на сайті</h1>
      <p>
        <Logo />
      </p>
      <p className="w-[400px] text-center text-lg">
        Тут ви зможете відслідковувати свої щомісячні витрати на комунальні
        послуги
      </p>
      <Link
        className="p-4 mt-2 text-white transition-colors rounded-2xl hover:bg-blue-500 bg-blue-400"
        href={"/records"}
      >
        Перейти до записів
      </Link>
    </section>
  );
};

export default Page;

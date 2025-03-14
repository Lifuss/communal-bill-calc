"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./Button";
import clsx from "clsx";

const NavButtons = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex space-x-2">
      <Button
        disabled={pathname === "/auth/login"}
        className={clsx(
          "cursor-pointer",
          pathname === "/auth/login" &&
            "bg-green-500 hover:bg-green-500 focus:bg-green-500 active:bg-green-500"
        )}
        onClick={() => router.push("/auth/login")}
      >
        Логін
      </Button>
      <Button
        disabled={pathname === "/auth/register"}
        className={clsx(
          "cursor-pointer",
          pathname === "/auth/register" &&
            "bg-green-500 hover:bg-green-500 focus:bg-green-500 active:bg-green-500"
        )}
        onClick={() => router.push("/auth/register")}
      >
        Реєстрація
      </Button>
    </div>
  );
};

export default NavButtons;

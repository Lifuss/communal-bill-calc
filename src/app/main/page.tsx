"use client";
import React from "react";
import { useSession } from "next-auth/react";
const Page = () => {
  const { data: session, status } = useSession();
  console.log(session);
  return <div>{status}</div>;
};

export default Page;

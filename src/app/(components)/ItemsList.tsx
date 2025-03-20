"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const ItemsList = () => {
    const query = useQuery({ queryKey: ['records'], queryFn: getRecords })

  const { data: session, status } = useSession();

  return (

  );
};

export default ItemsList;

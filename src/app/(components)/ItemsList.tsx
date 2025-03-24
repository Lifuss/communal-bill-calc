"use client";
import { Records } from "@/lib/types/sharedTypes";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface ListProps {
  title: string;
}

const ItemsList = ({ title }: ListProps) => {
  const query = useQuery({ queryKey: ["records"], queryFn: getRecords });

  const { data: session, status } = useSession();

  return (
    <div>
      {title && <h2>{title}</h2>}
      <ul>
        {status === "authenticated" && (
          <li>
            <button onClick={() => query.refetch()}>Refresh</button>
          </li>
        )}
        {query.data?.map((record: Records) => (
          <li key={record.id}>
            <span>{record.createdAt}</span>
            <span>{record.electricityKwh || "no data"}</span>
            <span>{record.gasM3 || "no data"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;

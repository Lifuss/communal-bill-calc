"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SkeletonList from "./skeletons/SkeletonList";

const fetchRecords = async (): Promise<any[]> => {
  const res = await fetch("/api/records");
  if (!res.ok) {
    // Тут можна розпарсити помилку з відповіді, якщо потрібно
    console.log(res);

    throw new Error("Failed to fetch records");
  }
  return res.json();
};

const RecordsList = () => {
  const { data: session, status } = useSession();

  // Виконуємо запит лише коли користувач автентифікований
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["records"],
    queryFn: fetchRecords,
    enabled: status === "authenticated",
  });

  if (status === "loading" || isLoading) {
    return <SkeletonList />;
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <h1 className="text-2xl font-bold">Неавторизовано</h1>
        <p className="text-xl">
          <Link href="/auth/login" className="underline">
            Ввійдіть
          </Link>{" "}
          в аккаунт для продовження
        </p>
      </div>
    );
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <ul>
        {data && data.length > 0 ? (
          data.map((record: any) => (
            <li key={record.id}>
              <span>{new Date(record.createdAt).toLocaleString()}</span>{" "}
              <span>{record.electricityKwh ?? "N/A"}</span>{" "}
              <span>{record.gasM3 ?? "N/A"}</span>
            </li>
          ))
        ) : (
          <div>No records found.</div>
        )}
      </ul>
    </div>
  );
};

export default RecordsList;

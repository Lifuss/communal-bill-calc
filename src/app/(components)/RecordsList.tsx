"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SkeletonList from "./skeletons/SkeletonList";
import { Records } from "@/lib/types/sharedTypes";
import Image from "next/image";
import RecordRow from "./RecordRow";

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
        <h1 classNameName="text-2xl font-bold">Неавторизовано</h1>
        <p classNameName="text-xl">
          <Link href="/auth/login" classNameName="underline">
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Вид
            </th>
            <th scope="col" className="px-6 py-3">
              Дата
            </th>
            <th scope="col" className="px-6 py-3">
              Використано (Кв/г|Куб)
            </th>
            <th
              title="Різниця відносно останнього запису"
              scope="col"
              className="px-6 py-3"
            >
              Динаміка
            </th>
            <th scope="col" className="px-6 py-3">
              Ціна\од
            </th>
            <th scope="col" className="px-6 py-3">
              Сума
            </th>
            <th scope="col" className="px-6 py-3">
              Дія
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((record: Records) => (
                <RecordRow key={record.id} record={record} />
              ))
            : "Даних нема"}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsList;

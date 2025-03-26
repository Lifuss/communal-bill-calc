"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SkeletonList from "./skeletons/SkeletonList";
import { Records, RecordType } from "@/lib/types/sharedTypes";
import RecordRow from "./RecordRow";
import Image from "next/image";

const fetchRecords = async (): Promise<any[]> => {
  const res = await fetch("/api/records");
  if (!res.ok) {
    console.log(res);

    throw new Error("Failed to fetch records");
  }
  return res.json();
};

const RecordsList = ({
  tableType = "electricity",
}: {
  tableType: RecordType;
}) => {
  const { data: session, status } = useSession();

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

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["records"],
    queryFn: fetchRecords,
    enabled: status === "authenticated",
  });

  if (status === "loading" || isLoading) {
    return <SkeletonList />;
  }
  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
  let filteredData: Records[] = [];

  if (tableType === "electricity" && data) {
    filteredData = data.filter(
      (record: Records) => record.type === "electricity"
    );
  } else if (tableType === "gas" && data) {
    filteredData = data.filter((record: Records) => record.type === "gas");
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-center mb-2">
        <Image
          src={`/assets/${tableType}.png`}
          alt={`знак ${
            tableType === "electricity" ? "електроенергії" : "газу"
          }`}
          width={24}
          height={24}
        />
        <h2 className="text-xl">
          {tableType === "electricity" ? "Електроенергія" : "Газ"}
        </h2>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {tableType === "gas" ? (
            <tr>
              <th scope="col" className="px-6 py-3">
                Дата
              </th>
              <th scope="col" className="px-6 py-3">
                Використано(Куб)
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
          ) : (
            <tr>
              <th scope="col" className="px-6 py-3">
                Дата
              </th>
              <th scope="col" className="px-6 py-3">
                Використано(Кв/г)
              </th>
              <th
                title="Різниця відносно останнього запису"
                scope="col"
                className="px-6 py-3"
              >
                Динаміка
              </th>
              <th scope="col" className="px-6 py-3">
                Використано Ніч.(Кв/г)
              </th>
              <th
                title="Різниця відносно останнього запису"
                scope="col"
                className="px-6 py-3"
              >
                Динаміка Ніч.
              </th>
              <th scope="col" className="px-6 py-3">
                Тариф(грн)
              </th>
              <th scope="col" className="px-6 py-3">
                Тариф Ніч.(грн)
              </th>
              <th scope="col" className="px-6 py-3">
                Сума
              </th>
              <th scope="col" className="px-6 py-3">
                Дія
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {filteredData && filteredData.length > 0
            ? filteredData.map((record: Records) => (
                <RecordRow
                  key={record.id}
                  record={record}
                  tableType={tableType}
                />
              ))
            : "Даних нема"}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsList;

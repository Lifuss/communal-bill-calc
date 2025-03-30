import React from "react";
import RecordsList from "../(components)/RecordsList";
import Link from "next/link";

const Page = () => {
  return (
    <section className="mx-auto w-full pt-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Записи</h1>
        <Link
          href={"/records/new"}
          className="bg-blue-500 rounded-lg p-3 text-lg text-white"
        >
          Створити новий запис
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 w-full justify-center">
        <RecordsList tableType="electricity" />
        <RecordsList tableType="gas" />
      </div>
    </section>
  );
};

export default Page;

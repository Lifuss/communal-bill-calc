import React from "react";
import RecordsList from "../(components)/RecordsList";

const Page = () => {
  return (
    <section className="mx-auto w-full">
      <h1 className="text-2xl text-center font-bold">Записи</h1>
      <RecordsList />
    </section>
  );
};

export default Page;

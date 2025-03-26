"use client";
import { Button } from "@/app/(components)/Button";
import ButtonsGroup from "@/app/(components)/ButtonsGroup";
import { RecordType } from "@/lib/types/sharedTypes";
import clsx from "clsx";
import { useState } from "react";

const Page = () => {
  const [formToggle, setFormToggle] = useState<RecordType>("electricity");

  const options = [
    { label: "Електроенергія", value: "electricity" as RecordType },
    { label: "Газ", value: "gas" as RecordType },
  ];
  return (
    <section>
      <h2 className="text-3xl text-center mb-4 mt-6">Новий Запис</h2>
      <ButtonsGroup
        options={options}
        stateToggle={formToggle}
        stateToggleFoo={setFormToggle}
      />
    </section>
  );
};

export default Page;

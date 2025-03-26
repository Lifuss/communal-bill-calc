"use client";

import { Button } from "@/app/(components)/Button";
import ButtonsGroup from "@/app/(components)/ButtonsGroup";
import { RecordType } from "@/lib/types/sharedTypes";
import { useState } from "react";

const Page = () => {
  const [formToggle, setFormToggle] = useState<RecordType>("electricity");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Зчитуємо дату запису (очікується формат YYYY-MM-DD)
    const recordDate = formData.get("recordDate") as string | null;

    // Основні поля, що є для обох типів
    const usage = formData.get("usage");
    const price = formData.get("price");

    // Формуємо базовий об'єкт для запису
    let recordData: {
      type: RecordType;
      recordDate?: string;
      usage?: number;
      price?: number;
      nightUsage?: number;
      nightPrice?: number;
    } = {
      type: formToggle,
      recordDate: recordDate ? recordDate : undefined,
      usage: usage ? Number(usage) : undefined,
      price: price ? parseFloat(price as string) : undefined,
    };

    // Якщо це електроенергія, додаємо додаткові поля
    if (formToggle === "electricity") {
      const nightUsage = formData.get("nightUsage");
      const nightPrice = formData.get("nightPrice");
      recordData = {
        ...recordData,
        nightUsage: nightUsage ? Number(nightUsage) : undefined,
        nightPrice: nightPrice ? parseFloat(nightPrice as string) : undefined,
      };
    }

    console.log("Record data:", recordData);
    // Тут ви можете зробити запит до API для створення запису
  };

  const options = [
    { label: "Електроенергія", value: "electricity" as RecordType },
    { label: "Газ", value: "gas" as RecordType },
  ];

  return (
    <section className="max-w-lg mx-auto p-4 border-2 border-gray-300 rounded-2xl mt-4">
      <div>
        <h2 className="text-3xl text-center mb-4 mt-2">Новий Запис</h2>
        <ButtonsGroup
          options={options}
          stateToggle={formToggle}
          stateToggleFoo={setFormToggle}
        />
      </div>
      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Поле для вибору дати */}
          <div>
            <label htmlFor="recordDate" className="block mb-1">
              Дата запису:
            </label>
            <input
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              name="recordDate"
              id="recordDate"
              className="border-2 border-gray-400 rounded-lg px-2 py-1 w-full"
            />
          </div>

          {/* Поля для основної інформації */}
          <div>
            <label htmlFor="usage" className="block mb-1">
              {formToggle === "electricity"
                ? "Використано(Кв):"
                : "Використано(Куб)"}
            </label>
            <input
              type="number"
              name="usage"
              id="usage"
              className="border-2 border-gray-400 rounded-lg px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1">
              Ціна/од (для газу або денний тариф):
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              id="price"
              className="border-2 border-gray-400 rounded-lg px-2 py-1 w-full"
              required
            />
          </div>

          {/* Додаткові поля для електроенергії */}
          {formToggle === "electricity" && (
            <>
              <div>
                <label htmlFor="nightUsage" className="block mb-1">
                  Нічне використання (кВт·год):
                </label>
                <input
                  type="number"
                  name="nightUsage"
                  id="nightUsage"
                  className="border-2 border-gray-400 rounded-lg px-2 py-1 w-full"
                />
              </div>
              <div>
                <label htmlFor="nightPrice" className="block mb-1">
                  Нічний тариф:
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="nightPrice"
                  id="nightPrice"
                  className="border-2 border-gray-400 rounded-lg px-2 py-1 w-full"
                />
              </div>
            </>
          )}

          <Button className="ml-auto" type="submit">
            Відправити
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Page;

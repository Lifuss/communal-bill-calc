import { Records, RecordType } from "@/lib/types/sharedTypes";
import React from "react";

const RecordRow = ({
  record,
  tableType = "electricity",
}: {
  record: Records;
  tableType: RecordType;
}) => {
  const { createdAt, id, type, userId, nightPrice, nightUsage, price, usage } =
    record;

  if (tableType === "gas") {
    return (
      <tr
        key={id}
        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
      >
        <td className="px-6 py-4">
          {new Date(createdAt).toLocaleDateString("uk-UA")}
        </td>
        <td className="px-6 py-4">{usage}</td>
        <td className="px-6 py-4">Заглушка</td>
        <td className="px-6 py-4">{price}</td>
        <td className="px-6 py-4">
          {typeof usage === "number" &&
            typeof price === "number" &&
            (usage * price).toFixed(2)}
        </td>
        <td className="px-6 py-4">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Ред.
          </a>
        </td>
      </tr>
    );
  }
  return (
    <tr
      key={id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
    >
      <td className="px-6 py-4">
        {new Date(createdAt).toLocaleDateString("uk-UA")}
      </td>
      <td className="px-6 py-4">{usage}</td>
      <td className="px-6 py-4">Динаміка --</td>
      <td className="px-6 py-4">{nightUsage}</td>
      <td className="px-6 py-4">Динаміка ніч</td>
      <td className="px-6 py-4">{price}</td>
      <td className="px-6 py-4">{nightPrice}</td>
      <td className="px-6 py-4">
        {typeof usage === "number" &&
          typeof price === "number" &&
          typeof nightUsage === "number" &&
          typeof nightPrice === "number" &&
          (usage * price + nightUsage * nightPrice).toFixed(2)}
      </td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Ред.
        </a>
      </td>
    </tr>
  );
};

export default RecordRow;

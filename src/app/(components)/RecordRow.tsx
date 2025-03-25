import { Records } from "@/lib/types/sharedTypes";
import Image from "next/image";
import React from "react";

const RecordRow = ({ record }: { record: Records }) => {
  const { createdAt, id, type, userId, nightPrice, nightUsage, price, usage } =
    record;

  return (
    <tr
      key={id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
    >
      <th
        scope="row"
        className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex"
      >
        <Image
          src={`/assets/${type}.png`}
          alt={`знак ${type === "electricity" ? "електроенергії" : "газу"}`}
          width={24}
          height={24}
        />{" "}
        <p>{type === "electricity" ? "Електроенергія" : "Газ"}</p>
      </th>
      <td className="px-6 py-4">
        {new Date(createdAt).toLocaleDateString("uk-UA")}
      </td>
      <td className="px-6 py-4">{usage}</td>
      <td className="px-6 py-4">Заглушка</td>
      <td className="px-6 py-4">{}</td>
      <td className="px-6 py-4">{price}</td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td>
    </tr>
  );
};

export default RecordRow;

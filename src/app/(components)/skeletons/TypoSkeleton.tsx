import React from "react";

const TypoSkeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <span className="sr-only">Завантаження...</span>
    </div>
  );
};

export default TypoSkeleton;

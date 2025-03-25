import React from "react";
import TypoSkeleton from "./TypoSkeleton";

const SkeletonList = () => {
  const items = Array.from({ length: 5 }, (_, i) => i);
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <TypoSkeleton key={item} />
      ))}
    </div>
  );
};

export default SkeletonList;

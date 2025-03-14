import React from "react";
import NavButtons from "./NavButtons";

const Header = () => {
  return (
    <header className="bg-gray-200 p-4 border-b border-gray-300 flex justify-between items-center">
      <h1 className="text-blue-500 text-2xl">Комуналка</h1>
      <div className="flex">
        <NavButtons />
      </div>
    </header>
  );
};

export default Header;

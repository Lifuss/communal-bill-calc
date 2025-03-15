import React from "react";
import NavButtons from "./NavButtons";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-gray-200 px-5 py-3 border-b border-gray-300 flex justify-between items-center">
      <Logo />
      <div className="flex">
        <NavButtons />
      </div>
    </header>
  );
};

export default Header;

import Logo from "./Logo";

const Footer = () => {
  const aClassName =
    "text-blue-500 hover:text-blue-800 focus:text-blue-800 active:text-blue-800";
  return (
    <footer className="border-t border-gray-300 pt-1 container mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Logo />
        </div>
        <div className="ml-auto">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Контакти</h3>
            <a className={aClassName} href="tel:380678678492">
              <span className="text-black">Тел: </span>{" "}
              <span className="underline">380678678492</span>
            </a>
            <a className={aClassName} href="mailto:arsen.hryh@gmail.com">
              <span className="text-black">E-mail: </span>
              <span className="underline">arsen.hryh@gmail.com</span>
            </a>
          </div>
        </div>
        <div className="col-span-2 text-center text-sx">
          <p>Всі права незахищені робіть що хочете</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

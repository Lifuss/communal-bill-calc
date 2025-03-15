import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/">
      <h1 className="text-blue-500 hover:text-blue-700 active:text-blue-700 focus:text-blue-700 text-2xl">
        Комуналка
      </h1>
    </Link>
  );
};

export default Logo;

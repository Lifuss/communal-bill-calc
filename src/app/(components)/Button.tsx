import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex items-center justify-center rounded-lg bg-blue-500 p-2 text-gray-200 font-medium transition-colors hover:bg-blue-600 focus-visible:bg-blue-700 focus-visible:outline focus-visible:outline-offset-2 active:bg-blue-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

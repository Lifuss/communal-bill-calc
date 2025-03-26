import React from "react";
import { Button } from "./Button";
import clsx from "clsx";

interface Option<T extends string> {
  label: string;
  value: T;
}

interface ButtonsGroupProps<T extends string> {
  options: Option<T>[];
  stateToggle: T;
  stateToggleFoo: (variant: T) => void;
}

const ButtonsGroup = <T extends string>({
  options,
  stateToggle,
  stateToggleFoo,
}: ButtonsGroupProps<T>) => {
  return (
    <div className="flex justify-center">
      {options.map((option, index) => (
        <Button
          key={option.value}
          onClick={() =>
            stateToggle !== option.value && stateToggleFoo(option.value)
          }
          className={clsx(
            index === 0 ? "rounded-r-none" : "rounded-l-none",
            "w-[150px]",
            stateToggle === option.value &&
              "bg-green-500 hover:bg-green-500 active:bg-green-500"
          )}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default ButtonsGroup;

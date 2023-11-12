import clsx from "clsx";
import React, { MouseEvent, ReactNode } from "react";

const Button = () => {};

Button.Container = ({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "w-full flex justify-end font-bold p-5",
        className
      )}
    >
      {children}
    </div>
  );
};

Button.Item = ({
  children,
  onClick = () => {},
}: {
  children: ReactNode;
  onClick?:
    | ((e: MouseEvent) => void)
    | ((e: MouseEvent) => Promise<void>);
}) => {
  return (
    <button
      className="glassmorph-listitem ml-4 py-4 px-5 w-fit rounded-md font-medium not-italic whitespace-nowrap"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

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
  className = "",
}: {
  children: ReactNode;
  onClick?:
    | ((e: MouseEvent) => void)
    | ((e: MouseEvent) => Promise<void>);
  className?: string;
}) => {
  return (
    <button
      className={clsx(
        "glassmorph-listitem ml-4 py-4 px-5 w-fit rounded-md font-medium not-italic whitespace-nowrap",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

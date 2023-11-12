import clsx from "clsx";
import React, { ReactNode } from "react";

const Loading = ({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "absolute left-0 top-0 z-[100] w-full h-full bg-theme text-white grid place-items-center",
        className
      )}
    >
      <span className="bounce">{children}</span>
    </div>
  );
};

export default Loading;

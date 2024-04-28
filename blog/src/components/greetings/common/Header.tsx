import React from "react";

const GreetingHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <h2 className="header !pb-2 mt-0">{children}</h2>;
};

export default GreetingHeader;

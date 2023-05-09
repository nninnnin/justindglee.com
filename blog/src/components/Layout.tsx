import React from "react";
import Navigation from "@components/Navigation";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col w-screen h-screen m-0 p-0">
      <Navigation />

      <div className="contents-viewer flex-1 w-3/4 mx-auto p-[30px]">
        {children}
      </div>
    </div>
  );
}

export default Layout;

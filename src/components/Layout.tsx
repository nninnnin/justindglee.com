import React from "react";
import Navigation from "@components/Navigation";

interface Props {
  contents: React.ReactNode;
}

function Layout({ contents }: Props) {
  return (
    <div className="container flex flex-row w-screen h-screen">
      <Navigation />

      <p className="flex-1 max-w-[700px] mx-auto p-[30px]">{contents}</p>
    </div>
  );
}

export default Layout;

import React from "react";
import Navigation from "./Navigation";

interface Props {
  children: React.ReactNode;
  hasPadding?: boolean;
  isEditing?: boolean;
}

function Layout({ children, hasPadding = true, isEditing = false }: Props) {
  return (
    <div className="layout-container">
      <div
        className={`contents-container glassmorph overflow-auto mx-auto ${
          isEditing ? "!w-full max-w-[1800px]" : "w-[640px]"
        } ${hasPadding && "p-[30px] pt-[26px] flex flex-col"}`}
      >
        <Navigation />
        {children}
      </div>
    </div>
  );
}

export default Layout;

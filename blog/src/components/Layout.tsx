import { Link } from "gatsby-link";
import React from "react";
import Navigation from "./Navigation";

interface Props {
  children: React.ReactNode;
  hasPadding?: boolean;
}

function Layout({ children, hasPadding = true }: Props) {
  return (
    <div className="layout-container">
      <div className="contents-viewer-wrapper flex-1 py-10">
        <div
          className={`contents-viewer glassmorph overflow-auto mx-auto w-[640px] h-full ${
            hasPadding && "p-[30px] pt-[26px] flex flex-col"
          }`}
        >
          <Navigation />
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;

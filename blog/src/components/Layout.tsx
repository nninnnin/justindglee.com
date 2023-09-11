import React from "react";
import Navigation from "./Navigation";
import { useRecoilValue } from "recoil";
import contextMenuState from "@src/states/contextMenu";
import { createPortal } from "react-dom";
import ContextMenu from "@components/ContextMenu";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  hasPadding?: boolean;
  isEditing?: boolean;
}

function Layout({
  children,
  hasPadding = true,
  isEditing = false,
}: Props) {
  const contextMenu = useRecoilValue(contextMenuState);

  return (
    <div className="layout-container">
      <div
        className={clsx(
          `contents-container`,
          `glassmorph overflow-auto mx-auto`,
          isEditing
            ? "!w-full max-w-[1800px]"
            : "w-[640px]",
          hasPadding && "p-[30px] pt-[26px] flex flex-col",
          contextMenu.isOpen && "overflow-hidden"
        )}
      >
        <Navigation />
        {children}
      </div>

      {contextMenu.isOpen &&
        createPortal(
          <div
            className={clsx(
              "fixed top-0 left-0 z-[1000]",
              "w-[100vw] h-[100vh] bg-transparent"
            )}
          >
            <ContextMenu.Container
              coordinates={contextMenu.coordinates}
            >
              {contextMenu.contents}
            </ContextMenu.Container>
          </div>,
          document.body
        )}
    </div>
  );
}

export default Layout;

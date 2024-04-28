import clsx from "clsx";
import React from "react";
import { createPortal } from "react-dom";
import { useRecoilValue } from "recoil";

import contextMenuState, {
  useContextMenu,
} from "@src/states/contextMenu";
import Navigation from "@components/Navigation";
import ContextMenu from "@components/ContextMenu";
import useEditingState from "@hooks/useEditingState";

interface Props {
  children: React.ReactNode;
  hasPadding?: boolean;
}

function Layout({ children, hasPadding = true }: Props) {
  const contextMenu = useRecoilValue(contextMenuState);
  const { closeContextMenu } = useContextMenu();

  const isEditing = useEditingState();

  return (
    <div className="layout-container">
      <div
        className={clsx(
          `contents-container`,
          "relative",
          `glassmorph-shiny overflow-auto mx-auto`,
          isEditing ? "!w-full max-w-[1800px]" : "",
          contextMenu.isOpen && "overflow-hidden"
        )}
      >
        <Navigation
          className={clsx(hasPadding && "p-[3vw] py-[2vw]")}
        />

        <div
          className={clsx(
            hasPadding &&
              "p-[3vw] pt-[2vw] sm:pt-[1vw] flex flex-col"
          )}
        >
          {children}
        </div>
      </div>

      {contextMenu.isOpen &&
        createPortal(
          <div
            className={clsx(
              "fixed top-0 left-0 z-[1000]",
              "w-[100vw] h-[100vh] bg-transparent"
            )}
            onClick={() => {
              closeContextMenu();
            }}
            onContextMenu={() => {
              closeContextMenu();
            }}
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

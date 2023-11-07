import React, { useState } from "react";
import { useContextMenu } from "@src/states/contextMenu";
import { Frame, FrameWrapper } from "./styles";
import clsx from "clsx";
import ContextMenu from "@components/ContextMenu";
import useEditingState from "@hooks/useEditingState";
import { editingContentsState } from "@components/PostEditor";
import { useRecoilState } from "recoil";
import { substituteContents } from "@src/utils/editor";

const Iframe = ({
  ratio,
  width,
  height,
  ...props
}: {
  ratio?: string;
  width: number;
  height: number;
  node: {
    properties: {
      width: number;
      height: number;
      preventinteraction?: string;
    };
    position: {
      start: {
        line: number;
        column: number;
        offset: number;
      };
      end: {
        line: number;
        column: number;
        offset: number;
      };
    };
  };
  preventInteraction?: string;
}) => {
  const { openContextMenu, closeContextMenu } =
    useContextMenu();

  const [showMessage, setShowMessage] = useState(false);

  const frameRatio = ratio
    ? Number(ratio)
    : (Number(height) / Number(width)) * 100;

  const isEditing = useEditingState();

  const [editingContents, setEditingContents] =
    useRecoilState(editingContentsState);

  const startAt = props.node.position.start.offset;
  const endAt = props.node.position.end.offset;

  const iframeElementText = editingContents.slice(
    startAt,
    endAt
  );

  const 인터랙션_방어_적용하기 = () => {
    setEditingContents(
      substituteContents(
        editingContents,
        startAt,
        endAt,
        iframeElementText.replace(
          ">",
          ` preventInteraction>`
        )
      )
    );
  };

  const hasInteractionPrevented = props.hasOwnProperty(
    "preventinteraction"
  );

  return (
    <FrameWrapper
      className={clsx("glassmorph !bg-white relative")}
      ratio={frameRatio}
    >
      <Frame {...props} ratio={frameRatio} />
      {(hasInteractionPrevented || isEditing) && (
        <div
          className={clsx(
            "w-full h-full absolute top-0 left-0",
            "transition-all",
            "bg-white opacity-0 hover:opacity-80",
            "cursor-pointer",
            "flex items-center justify-center",
            "text-[2vw] text-black text-shadow-none"
          )}
          onContextMenu={(e) => {
            e.preventDefault();

            openContextMenu({
              contents: (
                <ContextMenu.List>
                  <ContextMenu.ListItem
                    className="cursor-pointer select-none"
                    onClick={() => {
                      인터랙션_방어_적용하기();

                      closeContextMenu();
                    }}
                  >
                    유저 인터랙션 방어하기
                  </ContextMenu.ListItem>
                </ContextMenu.List>
              ),
              coordinates: {
                x: e.clientX + 1,
                y: e.clientY + 1,
              },
            });
          }}
          onMouseOver={() => {
            setShowMessage(true);
          }}
          onMouseLeave={() => {
            setShowMessage(false);
          }}
        >
          {showMessage && (
            <>
              해당 iframe에는 인터랙션 방어가 적용되어
              있습니다.
            </>
          )}
        </div>
      )}
    </FrameWrapper>
  );
};

export default Iframe;

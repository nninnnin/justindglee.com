import clsx from "clsx";
import { v4 as uuid } from "uuid";
import React, { useRef } from "react";

import { useContextMenu } from "@src/states/contextMenu";
import Tag from "@components/ContentsList/Tag";
import ContextMenu from "@components/ContextMenu";
import TagEditor from "@components/TagEditor";
import { Description } from "./styles";
import PublicationState from "./PublicationState";

interface Props {
  postId?: number;
  children: React.ReactNode;
}

const ListItem = ({ postId, children }: Props) => {
  const { openContextMenu } = useContextMenu();
  const contextId = useRef(uuid());

  const handleContext = (e: React.MouseEvent) => {
    e.preventDefault();

    const 태그설정하기_클릭핸들러 = () => {
      if (!postId) return;

      openContextMenu({
        contents: (
          <ContextMenu.List>
            <ContextMenu.ListItem>
              <TagEditor postId={postId} />
            </ContextMenu.ListItem>
          </ContextMenu.List>
        ),
      });
    };

    const contents = (
      <ContextMenu.List>
        <ContextMenu.ListItem
          onClick={태그설정하기_클릭핸들러}
        >
          태그 설정하기
        </ContextMenu.ListItem>
      </ContextMenu.List>
    );

    openContextMenu({
      contextId: contextId.current,
      coordinates: {
        x: e.clientX,
        y: e.clientY,
      },
      contents,
    });
  };

  return (
    <li
      className={clsx(
        "glassmorph-listitem p-5 mb-3 rounded-lg",
        "flex justify-between",
        "cursor-pointer relative"
      )}
      onContextMenu={handleContext}
    >
      {children}
    </li>
  );
};

ListItem.Description = Description;
ListItem.PublicationState = PublicationState;
ListItem.Tag = Tag;

export default ListItem;

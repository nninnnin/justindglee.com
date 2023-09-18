import clsx from "clsx";
import { v4 as uuid } from "uuid";
import React, { useRef } from "react";
import styled from "styled-components";

import { TagInterface } from "@src/types";
import { useContextMenu } from "@src/states/contextMenu";
import { Description } from "./styles";
import Tag from "@components/ContentsList/Tag";
import ContextMenu from "@components/ContextMenu";
import TagEditor from "@components/TagEditor";

interface Props {
  index: number;
  postId?: number;
  description: string;
  tags?: null | Array<TagInterface>;
}

const ListItem = ({ postId, description, tags }: Props) => {
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
        "flex flex-col justify-between items-start",
        "cursor-pointer relative"
      )}
      onContextMenu={handleContext}
    >
      <Description>{description}</Description>

      {tags && (
        <TagList>
          {tags.map((tag) => {
            return <Tag key={tag.id} name={tag.name} />;
          })}
        </TagList>
      )}
    </li>
  );
};

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export default ListItem;

import clsx from "clsx";
import { v4 as uuid } from "uuid";
import React, { useRef } from "react";
import styled from "styled-components";

import { TagInterface } from "@src/types";
import { Description } from "./styles";
import { useContextMenu } from "@src/states/contextMenu";
import Tag from "@components/ContentsList/Tag";
import ContextMenu from "@components/ContextMenu";
import TagEditor from "@components/TagEditor";

interface Props {
  index: number;
  description: string;
  tags?: null | Array<TagInterface>;
}

const ListItem = ({ description, tags }: Props) => {
  const { openContextMenu } = useContextMenu();
  const contextId = useRef(uuid());

  return (
    <li
      className={clsx(
        "glassmorph-listitem p-5 mb-3 rounded-lg",
        "flex justify-between items-center",
        "cursor-pointer relative"
      )}
      onContextMenu={(e) => {
        e.preventDefault();

        openContextMenu({
          contextId: contextId.current,
          coordinates: {
            x: e.clientX,
            y: e.clientY,
          },
          contents: (
            <ContextMenu.List>
              <ContextMenu.ListItem
                onClick={() => {
                  openContextMenu({
                    contents: (
                      <ContextMenu.List>
                        <ContextMenu.ListItem>
                          <TagEditor
                            tags={
                              tags as Array<TagInterface>
                            }
                          />
                        </ContextMenu.ListItem>
                      </ContextMenu.List>
                    ),
                  });
                }}
              >
                태그 설정하기
              </ContextMenu.ListItem>
            </ContextMenu.List>
          ),
        });
      }}
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
  max-width: 30%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export default ListItem;

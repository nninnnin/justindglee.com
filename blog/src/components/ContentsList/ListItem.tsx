import clsx from "clsx";
import { v4 as uuid } from "uuid";
import React, { useRef } from "react";

import { Tag } from "@src/types";
import { Description } from "./styles";
import { useContextMenu } from "@src/states/contextMenu";
import Tags from "@components/ContentsList/Tags";
import ContextMenu from "@components/ContextMenu";

interface Props {
  index: number;
  description: string;
  tags?: null | Array<Tag>;
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
                  // alert("...");

                  openContextMenu({
                    contents: (
                      <ContextMenu.List>
                        <ContextMenu.ListItem>
                          여기에서 태그를 쥐락펴락..
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

      {tags ? <Tags tags={tags} /> : <></>}
    </li>
  );
};

export default ListItem;

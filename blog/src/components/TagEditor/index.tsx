import React from "react";
import clsx from "clsx";

import { TagInterface } from "@src/types";
import Tag from "@components/ContentsList/Tag";

interface Props {
  tags: Array<TagInterface>;
}

const TagEditor = ({ tags }: Props) => {
  return (
    <>
      {tags && (
        <ul
          className={clsx(
            "flex flex-wrap items-center",
            "max-w-[300px]"
          )}
        >
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              name={tag.name}
              removable={true}
            />
          ))}

          <input
            className={clsx(
              "bg-slate-200 rounded-sm",
              "flex-1 h-[16.83px]",
              "py-[0.05em] px-[0.35em] ml-[0.2em]",
              "overflow-hidden",
              "text-[0.6em]"
            )}
            type="text"
            maxLength={10}
            autoFocus
          />
        </ul>
      )}
    </>
  );
};

export default TagEditor;

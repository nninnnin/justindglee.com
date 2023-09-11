import React from "react";

import { Tag } from "@src/types";

interface Props {
  tags: Array<Tag>;
}

const Tags = ({ tags }: Props) => {
  return (
    <div className="flex items-center text-sm font-medium">
      {tags.map((tag) => {
        return <div key={tag.id}>{tag.name}</div>;
      })}
    </div>
  );
};

export default Tags;

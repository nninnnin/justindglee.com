import React from "react";
import { Index, Description } from "./styles";
import { Tag } from "@src/types";
import Tags from "./Tags";

interface Props {
  index: number;
  description: string;
  tags?: null | Array<Tag>;
}

const ListItem = ({ index, description, tags }: Props) => {
  return (
    <li className="cursor-pointer flex justify-between items-center p-5 mb-3 rounded-lg glassmorph-listitem">
      <Description>{description}</Description>

      {tags ? <Tags tags={tags} /> : <></>}
    </li>
  );
};

export default ListItem;

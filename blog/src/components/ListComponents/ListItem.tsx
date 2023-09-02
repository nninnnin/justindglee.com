import React from "react";
import { Index, Description } from "./styles";

interface Props {
  index: number;
  description: string;
}

const ListItem = ({ index, description }: Props) => {
  return (
    <li className="cursor-pointer flex p-5 mb-3 rounded-lg glassmorph-listitem">
      <Description>{description}</Description>
    </li>
  );
};

export default ListItem;

import React from "react";
import { Index, Description } from "./styles";

interface Props {
  index: number;
  description: string;
}

const ListItem = ({ index, description }: Props) => {
  return (
    <li className="cursor-pointer m-2 flex">
      <Index>{index}</Index> | <Description>{description}</Description>
    </li>
  );
};

export default ListItem;

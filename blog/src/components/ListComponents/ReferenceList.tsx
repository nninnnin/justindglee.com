import React from "react";
import { Reference } from "@src/types";
import ListItem from "./ListItem";

interface Props {
  references: Array<Reference>;
}

const ReferenceList = ({ references }: Props) => {
  return (
    <ul className="bg-red">
      {references.map((refer: Reference) => {
        return (
          <a href={refer.url} key={`key-${refer.id}`}>
            <ListItem
              index={refer.index}
              description={refer.caption}
            />
          </a>
        );
      })}
    </ul>
  );
};

export default ReferenceList;

import React from "react";
import { Reference } from "@src/types";
import ListItem from "./ListItem";

interface Props {
  references: Array<Reference>;
}

const ReferenceList = ({ references }: Props) => {
  return (
    <ul className="bg-red">
      {references.map(
        ({
          id,
          title,
          caption,
          publisher,
          url,
        }: Reference) => {
          return (
            <a href={url} key={`key-${id}`}>
              <ListItem>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <ListItem.Description>
                    {title}
                  </ListItem.Description>

                  <ListItem.Tag
                    className="!ml-0 !pl-0"
                    name={caption}
                  />
                </div>

                <ListItem.Tag name={`by ${publisher}`} />
              </ListItem>
            </a>
          );
        }
      )}
    </ul>
  );
};

export default ReferenceList;

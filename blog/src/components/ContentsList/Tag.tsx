import React from "react";
import styled from "styled-components";
import removeButtonSource from "@icons/cross.png";
import clsx from "clsx";

const Tag = ({
  name,
  removable = false,
}: {
  name: string;
  removable?: boolean;
}) => {
  return (
    <Container>
      {name}
      {removable && (
        <img
          className={clsx(
            "!shadow-none mr-[-0.2em]",
            "hover:bg-slate-100"
          )}
          src={removeButtonSource}
          width={16}
          height={16}
          onClick={() => {
            // 해당 포스트에서 태그 제거
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.li`
  padding: 0.05em 0.35em;
  margin: 0.2em;
  border-radius: 3px;

  display: flex;
  align-items: center;

  background-color: gainsboro;
  color: black;
  text-shadow: none;

  font-size: 0.6em;
  width: fit-content;
  white-space: nowrap;
`;

export default Tag;

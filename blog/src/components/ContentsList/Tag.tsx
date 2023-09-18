import React from "react";
import styled from "styled-components";

const Tag = ({
  name,
}: {
  name: string;
  removable?: boolean;
}) => {
  return <Container>{name}</Container>;
};

const Container = styled.li`
  margin: 0.2em;
  margin-right: 0;
  padding: 0.05em 0.35em;
  padding-right: 0;

  &:first-child {
    margin-left: 0;
    padding-left: 0;
  }

  border-radius: 3px;
  width: fit-content;

  display: flex;
  align-items: center;

  color: rgba(255, 255, 255, 0.3);
  text-shadow: none;
  font-size: 0.8em;
  white-space: nowrap;

  &:hover {
    color: #ececec;
  }
`;

export default Tag;

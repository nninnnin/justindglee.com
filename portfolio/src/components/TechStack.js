import React from "react";
import styled from "styled-components";
import useMapIds from "../hooks/useMapIds.ts";

const TechStack = ({ stacks }) => {
  const stacksWithId = useMapIds(stacks);

  return (
    <Container>
      {stacksWithId.map((stack) => {
        return (
          <Badge key={stack.id} bgc={stack.bgc} color={stack.color}>
            {stack.name}
          </Badge>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > span {
    margin-top: 3px;
    margin-bottom: 3px;
    margin-right: 5px;
  }

  margin-top: auto;
  margin-bottom: 1em;
`;

const Badge = styled.span`
  background-color: navy;
  color: white;

  ${({ bgc, color }) => `
    ${
      bgc instanceof Array
        ? `background-image: linear-gradient(to right, ${bgc});`
        : `background-color: ${bgc};`
    };
    color: ${color};
  `};

  border-radius: 5px;
  padding: 8px;
  padding-top: 6px;

  font-size: 12px;
  font-family: "Pretendard", "sans-serif";
  font-weight: 500;
`;

export default TechStack;

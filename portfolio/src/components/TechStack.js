import styled from "styled-components";
import React from "react";

const TechStack = ({ stacks }) => {
  return (
    <Container>
      {stacks.map((stack) => {
        return (
          <Badge bgc={stack.bgc} color={stack.color}>
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

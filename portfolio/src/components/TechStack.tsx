import React from "react";
import { map } from "fxjs";
import styled from "styled-components";
import useMapIds from "../hooks/useMapIds.ts";
import Badge, { Icons } from "./Badge.tsx";

interface Props {
  stacks: Array<{
    icon: keyof typeof Icons;
    name: string;
  }>;
}

const TechStack = ({ stacks }: Props) => {
  const stacksWithId = useMapIds(stacks);

  return (
    <Container>
      {map((stack) => {
        return (
          <Badge key={stack.id} icon={stack.icon}>
            {stack.name}
          </Badge>
        );
      }, stacksWithId)}
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

export default TechStack;

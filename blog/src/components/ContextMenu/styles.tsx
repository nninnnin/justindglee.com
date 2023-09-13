import styled from "styled-components";

export const Container = styled.div<{
  $position: { x: number; y: number };
}>`
  background-color: white !important;
  border-radius: 4px;
  overflow: hidden;

  position: fixed;
  top: ${({ $position }) => `${$position.y}px`};
  left: ${({ $position }) => `${$position.x}px`};
`;

export const List = styled.ul`
  padding: 0.55em 0.5em;
`;

export const ListItem = styled.li`
  color: #525252;
  padding: 0.2em 0.8em;
  border-radius: 4px;

  font-size: 0.7em;
  text-shadow: none;

  transition: 0.1s;

  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #efefef;
  }

  &:last-child {
    border-bottom: 0;
  }
`;

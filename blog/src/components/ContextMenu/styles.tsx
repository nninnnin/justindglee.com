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
  display: flex;

  border-radius: 4px;
  text-shadow: none;
  color: #525252;

  cursor: pointer;
  user-select: none;

  transition: 0.1s;

  &:last-child {
    border-bottom: 0;
  }
`;

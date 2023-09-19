import styled from "styled-components";
import React, {
  MutableRefObject,
  ReactNode,
  useRef,
} from "react";
import { atom } from "recoil";
import useContextReposition from "@hooks/useContextReposition";

interface Props {
  coordinates: {
    x: number;
    y: number;
  };
  children: ReactNode;
}

export const containerContext =
  React.createContext<MutableRefObject<null> | null>(null);

export const coordinateXState = atom({
  key: "coordinateX",
  default: 0,
});

export const coordinateYState = atom({
  key: "coordinateY",
  default: 0,
});

const ContextMenuContainer = ({
  coordinates,
  children,
}: Props) => {
  const containerRef = useRef(null);
  const newPosition = useContextReposition(containerRef);

  return (
    <containerContext.Provider value={containerRef}>
      <Container
        className="context-menu-container glassmorph"
        tabIndex={-1}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        ref={containerRef}
        $position={{
          x: newPosition.x || coordinates.x,
          y: newPosition.y || coordinates.y,
        }}
      >
        {children}
      </Container>
    </containerContext.Provider>
  );
};

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

export default ContextMenuContainer;

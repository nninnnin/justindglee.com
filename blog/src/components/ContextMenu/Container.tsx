import styled from "styled-components";
import React, {
  ReactNode,
  useLayoutEffect,
  useRef,
} from "react";

interface Props {
  coordinates: {
    x: number;
    y: number;
  };
  children: ReactNode;
}

const ContextMenuContainer = ({
  coordinates,
  children,
}: Props) => {
  const containerRef = useRef<null | HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [containerRef.current]);

  return (
    <Container
      className="context-menu-container glassmorph"
      tabIndex={-1}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      $position={coordinates}
      ref={(ref) => {
        containerRef.current = ref;
      }}
    >
      {children}
    </Container>
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

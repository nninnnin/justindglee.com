import { useContextMenu } from "@src/states/contextMenu";
import React, {
  ReactNode,
  useLayoutEffect,
  useRef,
} from "react";
import { Container } from "@components/ContextMenu/styles";

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
  }, [containerRef]);

  const { closeContextMenu } = useContextMenu();

  return (
    <Container
      className="glassmorph"
      tabIndex={-1}
      // onBlur={() => closeContextMenu()}
      $position={coordinates}
      ref={containerRef}
    >
      {children}
    </Container>
  );
};

export default ContextMenuContainer;

import {
  coordinateXState,
  coordinateYState,
} from "@components/ContextMenu/Container";
import { useLayoutEffect } from "react";
import { useRecoilState } from "recoil";

type Ref = React.MutableRefObject<HTMLElement | null>;

const useContextReposition = (
  ref: Ref,
  dep: Array<unknown> = []
) => {
  const [xPosition, setXPosition] = useRecoilState(
    coordinateXState
  );
  const [yPosition, setYPosition] = useRecoilState(
    coordinateYState
  );

  useLayoutEffect(() => {
    if (ref && ref.current) {
      let { x, y, width, height } =
        ref.current.getBoundingClientRect();

      const horizontalEdge = x + width;
      const verticalEdge = y + height;

      const horizontalMargin = innerWidth - horizontalEdge;
      const verticalMargin = innerHeight - verticalEdge;

      const isOverInnerWidth = horizontalMargin < 0;
      const isOverInnerHeight = verticalMargin < 0;

      const ADDITIONAL_MARGIN = 20;

      if (isOverInnerWidth) {
        x += horizontalMargin - ADDITIONAL_MARGIN;
      }

      if (isOverInnerHeight) {
        y += verticalMargin - ADDITIONAL_MARGIN;
      }

      setXPosition(x);
      setYPosition(y);
    }

    return () => {
      setXPosition(0);
      setYPosition(0);
    };
  }, [...dep]);

  return { x: xPosition, y: yPosition };
};

export default useContextReposition;

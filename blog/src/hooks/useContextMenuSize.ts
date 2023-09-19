import {
  RefObject,
  useLayoutEffect,
  useState,
} from "react";

const useContextMenuSize = (
  ref: RefObject<HTMLElement>,
  deps: Array<unknown> = []
) => {
  const [size, setSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    if (ref.current) {
      const { width, height } =
        ref.current?.getBoundingClientRect() ?? {
          width: 0,
          height: 0,
        };

      setSize({
        width,
        height,
      });
    }
  }, [ref, ref.current, ...deps]);

  return { size };
};

export default useContextMenuSize;

import { ReactNode } from "react";
import { useLocation } from "@reach/router";
import {
  atom,
  useRecoilTransaction_UNSTABLE,
} from "recoil";

export interface ContextMenuInterface {
  contextId: string;
  isOpen: boolean;
  coordinates: {
    x: number;
    y: number;
  };
  contents: ReactNode;
}

const contextMenuState = atom<ContextMenuInterface>({
  key: "ContextMenuState",
  default: {
    contextId: "",
    isOpen: false,
    coordinates: { x: 0, y: 0 },
    contents: null,
  },
});

const useContextMenu = () => {
  const location = useLocation();
  const isEditable = location.pathname.includes("edit");

  const openContextMenu = useRecoilTransaction_UNSTABLE(
    ({ get, set, reset }) =>
      (newValue: Partial<ContextMenuInterface>) => {
        if (!isEditable) return;

        const prev = get(contextMenuState);

        // 이미 열려있는 경우
        if (prev.isOpen) {
          if (prev.contextId === newValue.contextId) {
            reset(contextMenuState);
          } else {
            set(contextMenuState, {
              ...prev,
              ...newValue,
              isOpen: true,
            });
          }

          return;
        }

        set(contextMenuState, {
          ...(newValue as ContextMenuInterface),
          isOpen: true,
          coordinates: newValue.coordinates ?? {
            x: 0,
            y: 0,
          },
        });
      }
  );

  const closeContextMenu = useRecoilTransaction_UNSTABLE(
    ({ reset }) =>
      () => {
        reset(contextMenuState);
      }
  );

  return { openContextMenu, closeContextMenu };
};

export { useContextMenu };

export default contextMenuState;

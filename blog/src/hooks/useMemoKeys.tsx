import { useCallback, useRef } from "react";

const useMemoKeys = () => {
  const pressedKeys = useRef<Record<string, boolean | null>>({});
  const isKeyPressed = useCallback((keyName:string) => pressedKeys.current[keyName], [pressedKeys]);
  const registerKey = useCallback((keyName:string) => {
    pressedKeys.current[keyName] = true
  }, [pressedKeys]);
  const releaseKey = useCallback((keyName:string) => {
    pressedKeys.current[keyName] = null;
  }, [pressedKeys]);

  return {
    pressedKeys,
    isKeyPressed,
    registerKey,
    releaseKey
  };
};

export default useMemoKeys;

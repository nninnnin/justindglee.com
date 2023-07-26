import { map } from "fxjs";
import { useMemo } from "react";
import { v4 as uuid } from "uuid";

export default function useMapIds(list: {}[]) {
  const result = useMemo(
    map((elem) => {
      return {
        id: uuid(),
        ...elem,
      };
    }, list),
    [list]
  );

  return result;
}

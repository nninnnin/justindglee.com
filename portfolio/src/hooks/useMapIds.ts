import { map } from "fxjs";
import { v4 as uuid } from "uuid";

export default function useMapIds(list: {}[]) {
  const result = map((elem) => {
    return {
      id: uuid(),
      ...elem,
    };
  }, list);

  return result;
}

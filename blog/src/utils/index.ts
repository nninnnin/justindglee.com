import { last } from "lodash";
import { pipe, map, reduce } from "@fxts/core";
import { StrapiResponseData } from "@src/types";

export const parseQueryString = (
  qs: string
): Record<string, string> => {
  const trimmed = last(qs.split("?"));

  if (!trimmed) return {}; // has no query string, ex) "?"

  return pipe(
    trimmed,
    (el) => el.split("&"),
    map((el) => el.split("=")),
    map(([key, value]) => ({ [key]: value })),
    reduce((acc, cur) => ({ ...acc, ...cur }))
  );
};

export const trimStart = (
  str: string,
  n: number
): string => {
  return str.slice(0, n).trimStart() + str.slice(n);
};

export const stripStrapiResponse = <T>(
  data: StrapiResponseData<T | T[]> | null
): T | T[] | null => {
  if (data === null) return null;

  const stripper = ({
    id,
    attributes,
  }: {
    id: number;
    attributes: Omit<T, "id">;
  }): T =>
    ({
      id,
      ...attributes,
    } as T);

  if (data.data instanceof Array) {
    const arrayData = data as StrapiResponseData<T[]>;

    return arrayData.data.map(stripper);
  }

  return stripper(
    data.data as {
      id: number;
      attributes: Omit<T, "id">;
    }
  );
};

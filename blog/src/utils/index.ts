import { last } from "lodash";
import { pipe, map, reduce } from "@fxts/core";

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

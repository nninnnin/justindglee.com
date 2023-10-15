import { last } from "lodash";
import { KeyboardEvent } from "react";

const isInsideValidCodeblock = (
  beforeCursor: string,
  afterCursor: string
): boolean => {
  return (
    (beforeCursor.match(/`{3}/g) ?? []).length % 2 === 1 &&
    (afterCursor.match(/`{3}/g) ?? []).length % 2 === 1
  );
};

const countStartingSpaces = (str: string) => {
  let count = 0;

  for (const char of str) {
    if (char !== " ") break;
    count++;
  }

  return count;
};

export const handlePressEnter = (
  e: KeyboardEvent<HTMLTextAreaElement>
) => {
  const start = e.currentTarget.selectionStart;
  const end = e.currentTarget.selectionEnd;

  // check the cursor is inside codeblock
  const beforeCursor = e.currentTarget.value.substring(
    0,
    start
  );
  const afterCursor =
    e.currentTarget.value.substring(start);

  if (!isInsideValidCodeblock(beforeCursor, afterCursor))
    return;

  e.preventDefault();

  // get the line contents before the cursor, after the line start
  const startingSpaces = countStartingSpaces(
    last(beforeCursor.split("\n")) ?? ""
  );

  // add spaces to the starts of newline!
  e.currentTarget.value =
    e.currentTarget.value.substring(0, start) +
    "\n" +
    " ".repeat(startingSpaces) +
    e.currentTarget.value.substring(start);

  e.currentTarget.selectionStart =
    e.currentTarget.selectionEnd =
      start + startingSpaces + 1;
};

export const substituteValue = (
  textarea: HTMLTextAreaElement,
  newValue: string
) => {
  const { selectionStart, selectionEnd } = textarea;

  const tabAddedValue =
    textarea.value.substring(0, selectionStart) +
    newValue +
    textarea.value.substring(selectionEnd);

  textarea.value = tabAddedValue;

  return textarea.value;
};

export const moveSelectionCursor = (
  textarea: HTMLTextAreaElement,
  start: number,
  end: number
) => {
  textarea.selectionStart = start;
  textarea.selectionEnd = end;
};

import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { pipe, map, toArray, filter } from "@fxts/core";
import { useLocation } from "@reach/router";

import { trimStart } from "@src/utils";
import useMemoKeys from "@src/hooks/useMemoKeys";
import usePostType from "@src/hooks/usePostType";

const POST_TYPES: Record<string, string> = {
  tech: "기술",
  life: "생활",
};

interface Props {
  title: string;
  editingContents: string;
  onChangeTitle?: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  onChangeContents: (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  buttons: React.ReactNode;
}

const ContentsEditor = ({
  title,
  editingContents,
  onChangeContents,
  onChangeTitle,
  buttons,
}: Props) => {
  const { selectedPostType, setSelectedPostType } =
    usePostType();

  const { pathname } = useLocation();

  useEffect(() => {
    const hasPostType = Object.keys(POST_TYPES).includes(
      pathname.split("/")[1]
    );

    if (hasPostType) {
      setSelectedPostType(pathname.split("/")[1]);
    }
  }, [pathname]);

  const { isKeyPressed, registerKey, releaseKey } =
    useMemoKeys();

  return (
    <div className="contents-editor flex flex-col flex-1 pt-5 pr-2">
      <div className="flex">
        <select
          className="text-blue-500 border-none outline-none p-3"
          name="포스트타입"
          id=""
          onChange={(e) => {
            setSelectedPostType(e.target.value);
          }}
        >
          {Object.keys(POST_TYPES).map(
            (postType: string) => (
              <option
                selected={selectedPostType === postType}
                value={postType}
              >
                {POST_TYPES[postType]}
              </option>
            )
          )}
        </select>

        <input
          className={`flex-1 p-3 !text-blue-500`}
          value={title}
          onChange={onChangeTitle}
        />
      </div>

      <textarea
        className={`w-full flex-1 bg-white text-blue-500 mt-5 p-3`}
        value={editingContents}
        onChange={onChangeContents}
        onKeyUp={(
          e: KeyboardEvent<HTMLTextAreaElement>
        ) => {
          if (e.key === "Shift") {
            releaseKey(e.key);
          }
        }}
        onKeyDown={(
          e: KeyboardEvent<HTMLTextAreaElement>
        ) => {
          if (e.key === "Shift") {
            registerKey(e.key);
          }

          if (e.key === "Tab") {
            e.preventDefault();

            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const TAB_SIZE = 2;
            const TAB_SPACE = " ".repeat(TAB_SIZE);
            const addSpace = (line: string) =>
              TAB_SPACE + line;
            const trimSpace = (line: string) =>
              trimStart(line, TAB_SIZE);

            const substituteValue = (newValue: string) => {
              const tabAddedValue =
                e.currentTarget.value.substring(0, start) +
                newValue +
                e.currentTarget.value.substring(end);

              e.currentTarget.value = tabAddedValue;
            };

            const moveSelectionCursor = (
              start: number,
              end: number
            ) => {
              e.currentTarget.selectionStart = start;
              e.currentTarget.selectionEnd = end;
            };

            if (start === end) {
              if (isKeyPressed("Shift")) {
                const contentsBeforeCursor =
                  e.currentTarget.value.substring(0, start);

                const hasEnoughSpaces = pipe(
                  contentsBeforeCursor.slice(-TAB_SIZE),
                  filter((char) => char === " "),
                  toArray,
                  (arr) => arr.length === TAB_SIZE
                );

                if (!hasEnoughSpaces) {
                  return;
                }

                e.currentTarget.value =
                  e.currentTarget.value.substring(
                    0,
                    start - TAB_SIZE
                  ) + e.currentTarget.value.substring(end);

                moveSelectionCursor(
                  start - TAB_SIZE,
                  start - TAB_SIZE
                );
              } else {
                substituteValue(TAB_SPACE);
                moveSelectionCursor(
                  start + TAB_SIZE,
                  start + TAB_SIZE
                );
              }

              return;
            }

            let selectedContents =
              e.currentTarget.value.substring(start, end);

            if (isKeyPressed("Shift")) {
              const trimmedContents = pipe(
                selectedContents.split("\n"),
                map(trimSpace),
                toArray,
                (lines) => lines.join("\n")
              );

              substituteValue(trimmedContents);

              const trimmedSpaces = selectedContents
                .split("\n")
                .reduce((acc, line) => {
                  const spaces = pipe(
                    line.substring(0, 2),
                    filter((char) => char === " "),
                    toArray,
                    (spaces) => spaces.join("").length
                  );

                  return acc + spaces;
                }, 0);

              moveSelectionCursor(
                start,
                end - trimmedSpaces
              );
            } else {
              selectedContents = pipe(
                selectedContents.split("\n"),
                map(addSpace),
                toArray,
                (lines) => lines.join("\n")
              );

              substituteValue(selectedContents);
              const addedSpaces =
                selectedContents.split("\n").length *
                TAB_SIZE;
              moveSelectionCursor(start, end + addedSpaces);
            }
          }
        }}
      />

      {buttons}
    </div>
  );
};

export default ContentsEditor;

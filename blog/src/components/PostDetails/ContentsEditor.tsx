import React, { ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import { pipe, map, toArray, reduce, filter } from "@fxts/core";
import { trimStart } from "@src/utils";
import useMemoKeys from "@src/hooks/useMemoKeys";

interface Props {
  isEditable: true;
  postId: number;
  title: string;
  editingContents: string;
  onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContentsEditor = ({
  isEditable,
  postId,
  title,
  editingContents,
  onChangeContents,
}: Props) => {
  const {
    isKeyPressed,
    registerKey,
    releaseKey
  } = useMemoKeys();

  const savePost = async () => {
    try {
      const token = localStorage.getItem("justinblog-token");

      const response = await axios.put(
        `${process.env.GATSBY_STRAPI_API_URL}/api/posts/${postId}`,
        {
          data: {
            contents: editingContents,
          },
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      console.log("변경 결과", response);

      alert("수정 성공!");
    } catch (error) {
      console.log("변경중 에러 발생");
      console.log(error);
    }
  };

  return (
    <div className="contents-editor flex flex-col flex-1 mr-5">
      <h1 className={`header ${isEditable && "!pb-0"}`}>{title}</h1>
      <textarea
        className={
          `w-full flex-1 bg-white text-blue-500 mt-5 border-none outline-none ${
          isEditable && "p-5"}`
        }
        value={editingContents}
        onChange={onChangeContents}
        onKeyUp={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Shift") {
            releaseKey(e.key);
          }
        }}
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Shift") {
            registerKey(e.key);
          }

          if (e.key === "Tab") {
            e.preventDefault();

            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const TAB_SIZE = 2;
            const TAB_SPACE = " ".repeat(TAB_SIZE);
            const addSpace = (line: string) => TAB_SPACE + line;
            const trimSpace = (line: string) => trimStart(line, TAB_SIZE);

            const substituteValue = (newValue: string) => {
              const tabAddedValue =
                e.currentTarget.value.substring(0, start) +
                newValue +
                e.currentTarget.value.substring(end);

              e.currentTarget.value = tabAddedValue;
            };

            const moveSelectionCursor = (start: number, end: number) => {
              e.currentTarget.selectionStart = start;
              e.currentTarget.selectionEnd = end;
            };

            if (start === end) {
              if (isKeyPressed("Shift")) {
                const contentsBeforeCursor = e.currentTarget.value.substring(0, start);

                const hasEnoughSpaces = pipe(
                  contentsBeforeCursor.slice(-TAB_SIZE),
                  filter(char => char === " "),
                  toArray,
                  (arr) => arr.length === TAB_SIZE
                );

                if (!hasEnoughSpaces) {
                  return;
                }
                
                e.currentTarget.value =
                  e.currentTarget.value.substring(0, start - TAB_SIZE) +
                  e.currentTarget.value.substring(end);

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

            let selectedContents = e.currentTarget.value.substring(
              start,
              end
            );

            if (isKeyPressed("Shift")) {
              const trimmedContents = pipe(
                selectedContents.split("\n"),
                map(trimSpace),
                toArray,
                (lines) => lines.join("\n")
              );
  
              substituteValue(trimmedContents);

              const trimmedSpaces = selectedContents.split("\n").reduce((acc, line) => {
                const spaces = pipe(
                  line.substring(0, 2),
                  filter((char) => char === " "),
                  toArray,
                  spaces => spaces.join("").length
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
              const addedSpaces = selectedContents.split("\n").length * TAB_SIZE;
              moveSelectionCursor(
                start,
                end + addedSpaces
              );
            }

          }
        }}
      />

      <button
        onClick={async () => {
          await savePost();
        }}
        className="p-5 bg-green-300"
      >
        수정하기
      </button>
    </div>
  );
};

export default ContentsEditor;

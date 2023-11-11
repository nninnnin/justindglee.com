import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from "react";
import { useLocation } from "@reach/router";
import { useSetRecoilState } from "recoil";
import { pipe, map, toArray, filter } from "@fxts/core";

import { trimStart } from "@src/utils";
import useMemoKeys from "@src/hooks/useMemoKeys";
import usePostType from "@src/hooks/usePostType";
import {
  handlePressEnter,
  moveSelectionCursor,
  substituteTextareaContents,
} from "@src/utils/editor";
import { editingImageState } from "@src/pages/post/[slug]/edit";
import { previewModeState } from "./PostEditor";
import Button from "./common/Button";

const POST_TYPES: Record<string, string> = {
  tech: "기술",
  life: "생활",
};

const TAB_SIZE = 2;

interface Props {
  title: string;
  contents: string;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (
    e:
      | ChangeEvent<HTMLTextAreaElement>
      | React.DragEvent<HTMLTextAreaElement>
  ) => void;
  buttons: React.ReactNode;
}

const ContentsEditor = ({
  title,
  contents,
  onChangeContents,
  onChangeTitle,
  buttons,
}: Props) => {
  const setEditingImages = useSetRecoilState(
    editingImageState
  );
  const setPreviewMode = useSetRecoilState(
    previewModeState
  );

  const { pathname } = useLocation();
  const { selectedPostType, setSelectedPostType } =
    usePostType();

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

  const handleFileDrop = async (
    e: React.DragEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    // 1. 이미지 렌더링을 위해 파일에서 object URL을 생성
    const imageFile = e.dataTransfer.files[0];
    const url = URL.createObjectURL(imageFile);

    // 1.1 추후 서버에 저장하기 위해 파일을 가져올 수 있도록 기록해둔다
    setEditingImages((prev) => {
      return new Map(prev.set(url, imageFile));
    });

    const image = new Image();
    image.src = url;

    const contentsEnd =
      e.currentTarget.selectionEnd + image.outerHTML.length;

    substituteTextareaContents(
      e.currentTarget,
      image.outerHTML
    );
    moveSelectionCursor(
      e.currentTarget,
      contentsEnd,
      contentsEnd
    );
    onChangeContents(e);
  };

  const handleKeyUp = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Shift") {
      releaseKey(e.key);
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      handlePressEnter(e);
    }

    if (e.key === "Shift") {
      registerKey(e.key);
    }

    if (e.key === "Tab") {
      e.preventDefault();

      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const TAB_SPACE = " ".repeat(TAB_SIZE);

      const addSpace = (line: string) => TAB_SPACE + line;

      const trimSpace = (line: string) =>
        trimStart(line, TAB_SIZE);

      const 블록설정을_하지_않았을_때 = start === end;
      if (블록설정을_하지_않았을_때) {
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
            e.currentTarget,
            start - TAB_SIZE,
            start - TAB_SIZE
          );
        } else {
          substituteTextareaContents(
            e.currentTarget,
            TAB_SPACE
          );
          moveSelectionCursor(
            e.currentTarget,
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

        substituteTextareaContents(
          e.currentTarget,
          trimmedContents
        );

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
          e.currentTarget,
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

        substituteTextareaContents(
          e.currentTarget,
          selectedContents
        );
        const addedSpaces =
          selectedContents.split("\n").length * TAB_SIZE;
        moveSelectionCursor(
          e.currentTarget,
          start,
          end + addedSpaces
        );
      }
    }
  };

  const handlePostTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPostType(e.target.value);
  };

  const postTypes = Object.keys(POST_TYPES).map(
    (postType: string) => (
      <option key={postType} value={postType}>
        {POST_TYPES[postType]}
      </option>
    )
  );

  return (
    <div className="contents-editor flex flex-col flex-1">
      <div className="flex">
        <select
          className="text-blue-500 border-none outline-none p-3"
          name="포스트타입"
          id=""
          onChange={handlePostTypeChange}
          value={selectedPostType}
        >
          {postTypes}
        </select>

        <input
          className={`flex-1 p-3 !text-blue-500`}
          value={title}
          onChange={onChangeTitle}
        />
      </div>

      <textarea
        className={`w-full flex-1 bg-white text-blue-500 my-5 p-3`}
        value={contents}
        onChange={onChangeContents}
        onDrop={handleFileDrop}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      />

      <Button.Container>
        {buttons}

        <Button.Item
          onClick={() => {
            // ..
            setPreviewMode(true);
          }}
        >
          미리보기
        </Button.Item>
      </Button.Container>
    </div>
  );
};

export default ContentsEditor;

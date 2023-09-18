import styled from "styled-components";
import React, { useRef } from "react";
import clsx from "clsx";

import Badge from "@components/ContextMenu/Badge";
import useTags from "@src/hooks/useTags";
import removeButtonSource from "@icons/cross.png";
import usePostTags from "@src/hooks/usePostTags";
import useContextMenuSize from "@hooks/useContextMenuSize";

interface Props {
  postId: number;
}

const TagEditor = ({ postId }: Props) => {
  const {
    postTags,
    getPostTags,
    registerTag,
    unregisterTag,
    loading: postTagLoading,
  } = usePostTags(postId);
  const { tags, loading, addTag, removeTag } = useTags();

  const listRef = useRef(null);
  const { width, height } = useContextMenuSize(listRef, [
    postTags,
    tags,
  ]);

  // 3. TODO: 검색기능
  // 유저 태그를 필터링해야한다. useMemo로 메모.

  if (postTagLoading || loading)
    return (
      <Loading widthSize={width} heightSize={height}>
        태그 가져오는 중..
      </Loading>
    );

  return (
    <div
      className="flex flex-col max-w-[300px]"
      ref={listRef}
    >
      <div>
        {postTags && !!postTags.length && (
          <ul
            className={clsx(
              "flex flex-wrap items-center",
              "w-full"
            )}
          >
            {postTags.map((tag) => (
              <Badge
                key={tag.id}
                handleRemoveButtonClick={async () => {
                  await unregisterTag(tag.id);
                }}
              >
                {tag.name}
              </Badge>
            ))}
          </ul>
        )}
      </div>

      <input
        className={clsx(
          "bg-slate-200 rounded-sm",
          "flex-1 h-[25.59px]",
          "py-[0.2em] px-[0.35em] m-[0.2em] my-[0.35em]",
          "overflow-hidden",
          "text-[0.8rem]"
        )}
        type="text"
        maxLength={15}
        onKeyDown={async (e) => {
          if (e.key !== "Enter") return;

          await addTag(e.currentTarget.value);
        }}
        autoFocus
      />

      <div>
        {tags && (
          <ul
            className={clsx(
              "flex flex-col items-start",
              "w-full"
            )}
          >
            {tags.map((tag) => (
              <li
                key={tag.id}
                className="flex justify-between items-center hover:bg-[#f9f9f9] w-full cursor-pointer"
                onClick={async () => {
                  // 태그 등록하기
                  await registerTag(tag.id);
                }}
              >
                <Badge removable={false}>{tag.name}</Badge>

                <img
                  className="w-[16px] h-[16px] mr-[0.5em]"
                  src={removeButtonSource}
                  onClick={async (e) => {
                    e.preventDefault();

                    await removeTag(tag.id, tag.posts);

                    if (tag.posts && tag.posts.length > 0)
                      await getPostTags();
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Loading = styled.div<{
  widthSize: number;
  heightSize: number;
}>`
  min-width: ${({ widthSize }) => `${widthSize}px`};
  min-height: ${({ heightSize }) => `${heightSize}px`};

  display: grid;
  place-items: center;
`;

export default TagEditor;

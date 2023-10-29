import axios from "axios";
import React, { MouseEvent } from "react";
import { useRecoilValue } from "recoil";

import usePostType from "@src/hooks/usePostType";
import PostEditor, {
  editingTitleState,
  editingContentsState,
} from "@components/PostEditor";
import replaceImageUrls from "@src/utils/replaceImageUrls";
import { curry } from "@fxts/core";
import { editingImageState } from "./post/[slug]/edit";

const EditorPage = () => {
  const title = useRecoilValue(editingTitleState);
  const contents = useRecoilValue(editingContentsState);
  const editingImages = useRecoilValue(editingImageState);

  const { selectedPostType } = usePostType();

  const savePost = curry(
    async (
      editingImages: Map<string, File>,
      publish: boolean
    ) => {
      const slug = prompt("slug를 입력해주세요 :)");
      const token = localStorage.getItem(
        "justinblog-token"
      );

      const replacedContents = await replaceImageUrls(
        editingImages,
        contents
      );

      try {
        await axios.post(
          `${process.env.GATSBY_STRAPI_API_URL}/api/posts`,
          {
            data: {
              title,
              contents: replacedContents,
              type: selectedPostType,
              slug,
              publishedAt: publish ? new Date() : null,
            },
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        alert("포스트 생성 성공!");
      } catch (error) {
        alert("포스트 생성 실패..");

        console.log(error);
      }
    }
  )(editingImages);

  const handleSaveButtonClick = async (e: MouseEvent) => {
    e.preventDefault();

    await savePost(false);

    location.href = "/posts";
  };

  const handleRegisterButtonClick = async (
    e: MouseEvent
  ) => {
    e.preventDefault();

    await savePost(true);

    location.href = "/posts";
  };

  const buttons = (
    <div className="flex">
      <button
        onClick={handleSaveButtonClick}
        className="flex-1 p-5 bg-orange-300"
      >
        저장하기
      </button>

      <button
        onClick={handleRegisterButtonClick}
        className="flex-1 p-5 bg-green-300"
      >
        발행하기
      </button>
    </div>
  );

  return (
    <PostEditor
      title={title}
      contents={contents}
      button={buttons}
    />
  );
};

export default EditorPage;

export async function getServerData() {
  return {};
}

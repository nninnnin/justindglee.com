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
import Button from "@components/common/Button";
import {
  redirectToEditingPosts,
  triggerDeployment,
} from "@src/utils";

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
      if (!title) {
        alert("제목 없이 글을 쓸 생각을 하다니..");
        return false;
      }

      if (!contents) {
        alert("내용을 써야 글을 쓸 수 있어요..");
        return false;
      }

      const slug = prompt("slug를 입력해주세욧..");

      if (!slug) {
        alert("slug 없이는 글을 등록할 수 없답니다..");
        return false;
      }

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

        return true;
      } catch (error) {
        alert("포스트 생성 실패..");

        console.log(error);

        return false;
      }
    }
  )(editingImages);

  const handleSaveButtonClick = async (e: MouseEvent) => {
    e.preventDefault();

    const isSaved = await savePost(false);
    if (!isSaved) {
      return;
    }

    triggerDeployment();
  };

  const handleRegisterButtonClick = async (
    e: MouseEvent
  ) => {
    e.preventDefault();

    const registerRequested = await savePost(true);

    if (registerRequested) {
      triggerDeployment();
      redirectToEditingPosts();
    }
  };

  const buttons = (
    <>
      <Button.Item onClick={handleSaveButtonClick}>
        저장하기
      </Button.Item>

      <Button.Item onClick={handleRegisterButtonClick}>
        발행하기
      </Button.Item>
    </>
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

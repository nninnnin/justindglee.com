import axios from "axios";
import React from "react";

import { Post } from "@src/types";
import { atom, useRecoilValue } from "recoil";
import PostEditor, {
  editingTitleState,
  editingContentsState,
} from "@components/PostEditor";
import replaceImageUrls from "@src/utils/replaceImageUrls";
import { curry } from "@fxts/core";
import Button from "@components/common/Button";
import {
  redirectToEditingPosts,
  triggerDeployment,
} from "@src/utils";

interface Props {
  serverData: {
    post: Post;
    publicationState: "published" | "draft";
  };
}

export const editingImageState = atom<Map<string, File>>({
  key: "",
  default: new Map<string, File>(),
});

const PostPage = ({
  serverData: { post, publicationState },
}: Props) => {
  const title = useRecoilValue(editingTitleState);
  const contents = useRecoilValue(editingContentsState);

  const editingImages = useRecoilValue(editingImageState);

  const savePost = curry(
    async (
      editingImages: Map<string, File>,
      title: string,
      contents: string,
      publish: boolean
    ) => {
      try {
        const token = localStorage.getItem(
          "justinblog-token"
        );

        const replacedContents = await replaceImageUrls(
          editingImages,
          contents
        );

        await axios.put(
          `${process.env.GATSBY_STRAPI_API_URL}/api/posts/${post.id}`,
          {
            data: {
              title,
              contents: replacedContents,
              publishedAt: publish ? new Date() : null,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("수정 성공!");
      } catch (error) {
        console.log("변경중 에러 발생");
        console.log(error);
      }
    }
  )(editingImages);

  const handleSaveButtonClick = async () => {
    await savePost(title, contents, false);
  };

  const handlePublishButtonClick = async () => {
    await savePost(title, contents, true);
    await triggerDeployment();
    await redirectToEditingPosts();
  };

  const publishButton = (
    <>
      <Button.Item onClick={handleSaveButtonClick}>
        저장하기
      </Button.Item>

      <Button.Item onClick={handlePublishButtonClick}>
        발행하기
      </Button.Item>
    </>
  );

  const handleHidingArticleButtonClick = async () => {
    await savePost(title, contents, false);
    await triggerDeployment();
  };

  const handleUpdateArticleButtonClick = async () => {
    await savePost(title, contents, true);
    await triggerDeployment();
  };

  const editButton = (
    <>
      <Button.Item onClick={handleHidingArticleButtonClick}>
        숨기기
      </Button.Item>

      <Button.Item onClick={handleUpdateArticleButtonClick}>
        수정하기
      </Button.Item>
    </>
  );

  const buttons = {
    draft: publishButton,
    published: editButton,
  };

  return (
    <PostEditor
      title={post.title}
      contents={post.contents}
      button={buttons[publicationState]}
    />
  );
};

export default PostPage;

export async function getServerData(ctx: {
  params: Record<string, string>;
}) {
  const { slug } = ctx.params;

  const {
    data: { data },
  } = await axios(
    `${process.env.GATSBY_STRAPI_API_URL}/api/post/find-by-slug/${slug}`,
    {
      headers: {
        authorization: `Bearer ${process.env.GATSBY_STRAPI_TOKEN}`,
      },
    }
  );

  const hasPublished = Boolean(data.attributes.publishedAt);

  return {
    props: {
      post: {
        id: data.id,
        ...data.attributes,
      },
      publicationState: hasPublished
        ? "published"
        : "draft",
    },
  };
}

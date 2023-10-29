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

  const publishButton = (
    <div className="flex">
      <button
        onClick={async () => {
          await savePost(title, contents, false);
        }}
        className="flex-1 p-5 bg-sky-400"
      >
        저장하기
      </button>

      <button
        onClick={async () => {
          await savePost(title, contents, true);

          location.href = "/posts";
        }}
        className="flex-1 p-5 bg-pink-400"
      >
        발행하기
      </button>
    </div>
  );

  const editButton = (
    <>
      <button
        onClick={async () => {
          await savePost(title, contents, false);

          location.href = "/posts/edit";
        }}
        className="p-5 bg-green-300"
      >
        숨기기
      </button>
      <button
        onClick={async () => {
          await savePost(title, contents, true);

          location.href = "/posts/edit";
        }}
        className="p-5 bg-green-300"
      >
        수정하기
      </button>
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

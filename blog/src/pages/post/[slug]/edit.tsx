import axios from "axios";
import React from "react";

import { Post } from "@src/types";
import { useRecoilValue } from "recoil";
import PostEditor, {
  editingTitleState,
  editingContentsState,
} from "@components/PostEditor";

interface Props {
  serverData: {
    post: Post;
    publicationState: "published" | "draft";
  };
}

const PostPage = ({
  serverData: { post, publicationState },
}: Props) => {
  const title = useRecoilValue(editingTitleState);
  const contents = useRecoilValue(editingContentsState);

  const savePost = async ({
    publish,
  }: {
    publish: boolean;
  }) => {
    try {
      const token = localStorage.getItem(
        "justinblog-token"
      );

      await axios.put(
        `${process.env.GATSBY_STRAPI_API_URL}/api/posts/${post.id}`,
        {
          data: {
            title: title,
            contents: contents,
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

      location.href = "/";
    } catch (error) {
      console.log("변경중 에러 발생");
      console.log(error);
    }
  };

  const publishButton = (
    <button
      onClick={async () => {
        await savePost({ publish: true });
      }}
      className="p-5 bg-pink-400"
    >
      공개하기
    </button>
  );

  const editButton = (
    <button
      onClick={async () => {
        await savePost({ publish: true });
      }}
      className="p-5 bg-green-300"
    >
      수정하기
    </button>
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

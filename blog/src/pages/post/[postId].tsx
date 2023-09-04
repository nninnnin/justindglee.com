import axios from "axios";
import React from "react";

import { Post } from "@src/types";
import PostDetails, {
  editingContentsState,
  editingTitleState,
} from "@components/PostDetails";
import { useRecoilValue } from "recoil";

interface Props {
  serverData: {
    post: Post;
  };
}

const PostPage = ({ serverData: { post } }: Props) => {
  const title = useRecoilValue(editingTitleState);
  const contents = useRecoilValue(editingContentsState);

  const publishPost = async () => {
    try {
      const token = localStorage.getItem(
        "justinblog-token"
      );

      console.log({
        title,
        contents,
        publishedAt: new Date(),
      });

      const response = await axios.put(
        `${process.env.GATSBY_STRAPI_API_URL}/api/posts/${post.id}`,
        {
          data: {
            title,
            contents,
            publishedAt: new Date(),
          },
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
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
        await publishPost();
      }}
      className="p-5 bg-pink-400"
    >
      공개하기
    </button>
  );

  return (
    <PostDetails
      pageContext={{
        post,
      }}
      buttons={publishButton}
    />
  );
};

export default PostPage;

export async function getServerData(ctx: {
  params: Record<string, string>;
}) {
  const { postId } = ctx.params;

  const {
    data: { data },
  } = await axios(
    `${process.env.GATSBY_STRAPI_API_URL}/api/posts/${postId}`,
    {
      headers: {
        authorization: `Bearer ${process.env.GATSBY_STRAPI_TOKEN}`,
      },
    }
  );

  return {
    props: {
      post: {
        id: postId,
        ...data.attributes,
      },
    },
  };
}

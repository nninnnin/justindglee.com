import axios from "axios";
import React, { MouseEvent } from "react";

import PostDetails, {
  editingContentsState,
  editingTitleState,
} from "@components/PostDetails";
import usePostType from "@src/hooks/usePostType";
import { useRecoilValue } from "recoil";

const EditorPage = () => {
  const isBrowser = typeof window !== "undefined";

  if (!isBrowser) return <></>;

  const title = useRecoilValue(editingTitleState);
  const contents = useRecoilValue(editingContentsState);

  const { selectedPostType } = usePostType();

  const savePost = async (publish: "draft" | "publish") => {
    const slug = prompt("slug를 입력해주세요 :)");
    const token = localStorage.getItem("justinblog-token");

    try {
      await axios.post(
        `${process.env.GATSBY_STRAPI_API_URL}/api/posts`,
        {
          data: {
            title,
            contents,
            type: selectedPostType,
            slug,
            publishedAt:
              publish === "draft" ? null : new Date(),
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      alert("포스트 생성 성공!");

      location.href = "/";
    } catch (error) {
      alert("포스트 생성 실패..");

      console.log(error);
    }
  };

  const handleSaveButtonClick = async (e: MouseEvent) => {
    e.preventDefault();

    await savePost("draft");
  };

  const handleRegisterButtonClick = async (
    e: MouseEvent
  ) => {
    e.preventDefault();

    await savePost("publish");
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
        작성하기
      </button>
    </div>
  );

  return (
    <PostDetails
      pageContext={{
        post: {
          title,
          contents,
        },
      }}
      buttons={buttons}
    />
  );
};

export default EditorPage;

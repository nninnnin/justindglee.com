import axios from "axios";
import React, {
  ChangeEvent,
  MouseEvent,
  useState,
} from "react";

import Layout from "@components/Layout";
import ContentsEditor from "@components/PostDetails/ContentsEditor";
import ContentsViewer from "@components/PostDetails/ContentsViewer";
import Authorizer from "@components/Authorizer";
import { Container } from "@components/PostDetails";
import usePostType from "@src/hooks/usePostType";

const EditorPage = () => {
  const isBrowser = typeof window !== "undefined";

  if (!isBrowser) return <></>;

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

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

  return (
    <Authorizer>
      <Layout isEditing={true}>
        <Container>
          <ContentsEditor
            title={title}
            editingContents={contents}
            onChangeContents={(
              e: ChangeEvent<HTMLTextAreaElement>
            ) => setContents(e.currentTarget.value)}
            onChangeTitle={(
              e: ChangeEvent<HTMLInputElement>
            ) => setTitle(e.target.value)}
            buttons={
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
            }
          />

          <ContentsViewer
            isEditable={true}
            title={title}
            contents={contents}
          />
        </Container>
      </Layout>
    </Authorizer>
  );
};

export default EditorPage;

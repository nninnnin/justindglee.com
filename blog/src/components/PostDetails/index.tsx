import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "@reach/router";

import Layout from "@components/Layout";
import { parseQueryString } from "@src/utils";
import ContentsViewer from "./ContentsViewer";
import ContentsEditor from "./ContentsEditor";
import Authorizer from "@components/Authorizer";
import { atom, useRecoilState } from "recoil";

interface Props {
  pageContext: {
    post: {
      strapiId?: number;
      title: string;
      contents: string;
    };
  };
  buttons?: React.ReactNode;
}

export const editingTitleState = atom({
  key: "editingTitleState",
  default: "",
});
export const editingContentsState = atom({
  key: "editingContentsState",
  default: "",
});

const PostDetail = ({ pageContext, buttons }: Props) => {
  const { post } = pageContext;

  const [isEditable, setIsEditable] =
    useState<boolean>(false);

  const [title, setTitle] = useRecoilState(
    editingTitleState
  );
  const [contents, setContents] = useRecoilState(
    editingContentsState
  );

  const { search, pathname } = useLocation();

  useEffect(() => {
    setTitle(post.title);
    setContents(post.contents);
  }, [post]);

  useEffect(() => {
    const isEditable =
      Boolean(parseQueryString(search)["edit"]) ||
      Boolean(pathname.includes("editor"));

    setIsEditable(isEditable);
  }, [search]);

  const savePost = async () => {
    try {
      const token = localStorage.getItem(
        "justinblog-token"
      );

      const response = await axios.put(
        `${process.env.GATSBY_STRAPI_API_URL}/api/posts/${post.strapiId}`,
        {
          data: {
            title: title,
            contents: contents,
          },
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      console.log("변경 결과", response);

      alert("수정 성공!");

      location.href = "/";
    } catch (error) {
      console.log("변경중 에러 발생");
      console.log(error);
    }
  };

  const editButton = (
    <button
      onClick={async () => {
        await savePost();
      }}
      className="p-5 bg-green-300"
    >
      수정하기
    </button>
  );

  return (
    <Authorizer disabled={!isEditable}>
      <Layout isEditing={isEditable}>
        <Container>
          {isEditable && (
            <ContentsEditor
              title={title}
              contents={contents}
              onChangeTitle={(e) => {
                setTitle(e.currentTarget.value);
              }}
              onChangeContents={(e) => {
                setContents(e.currentTarget.value);
              }}
              buttons={buttons ? buttons : editButton}
            />
          )}

          <ContentsViewer
            title={title}
            contents={contents}
            isEditable={isEditable}
          />
        </Container>
      </Layout>
    </Authorizer>
  );
};

export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export default PostDetail;

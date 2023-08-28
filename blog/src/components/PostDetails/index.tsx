import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "@reach/router";

import Layout from "@components/Layout";
import { parseQueryString } from "@src/utils";
import Login from "../Login";
import ContentsViewer from "./ContentsViewer";
import ContentsEditor from "./ContentsEditor";
import Authorizer from "@components/Authorizer";

interface Props {
  pageContext: {
    post: {
      strapiId: number;
      title: string;
      contents: string;
    };
  };
}

const PostDetail = ({ pageContext }: Props) => {
  const { post } = pageContext;
  const { title, contents, strapiId } = post;

  const [isEditable, setIsEditable] =
    useState<boolean>(false);
  const [editingContents, setEditingContents] =
    useState(contents);

  const params = useLocation();

  useEffect(() => {
    const queryString = params.search;
    const isEditable = Boolean(
      parseQueryString(queryString)["edit"]
    );

    setIsEditable(isEditable);
  }, [params.search]);

  const savePost = async () => {
    try {
      const token = localStorage.getItem(
        "justinblog-token"
      );

      const response = await axios.put(
        `${process.env.GATSBY_STRAPI_API_URL}/api/posts/${strapiId}`,
        {
          data: {
            contents: editingContents,
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
    } catch (error) {
      console.log("변경중 에러 발생");
      console.log(error);
    }
  };

  return (
    <Authorizer disabled={!isEditable}>
      <Layout isEditing={isEditable}>
        <Container>
          {isEditable && (
            <ContentsEditor
              title={title}
              editingContents={editingContents}
              onChangeContents={(e) => {
                const target = e.currentTarget;

                setEditingContents(target.value);
              }}
              buttons={
                <button
                  onClick={async () => {
                    await savePost();
                  }}
                  className="p-5 bg-green-300"
                >
                  수정하기
                </button>
              }
            />
          )}

          <ContentsViewer
            title={title}
            contents={editingContents}
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

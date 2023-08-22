import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { useLocation } from "@reach/router";

import Layout from "@components/Layout";
import { parseQueryString } from "@src/utils";
import Login from "../Login";
import ContentsViewer from "./ContentsViewer";
import ContentsEditor from "./ContentsEditor";

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

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [editingContents, setEditingContents] = useState(contents);

  const params = useLocation();

  useEffect(() => {
    const queryString = params.search;
    const isEditable = Boolean(parseQueryString(queryString)["edit"]);

    setIsEditable(isEditable);
  }, [params.search]);

  useEffect(() => {
    const token = localStorage.getItem("justinblog-token");
    const hasToken = Boolean(token) && Boolean(token?.length);
    setHasToken(hasToken);
  }, []);

  if (isEditable && !hasToken) return <Login />;

  return (
    <Layout isEditing={isEditable}>
      <Container>
        {isEditable && (
          <ContentsEditor
            isEditable={isEditable}
            postId={strapiId}
            title={title}
            editingContents={editingContents}
            onChangeContents={(e) => {
              const target = e.target;

              setEditingContents(target.value);
            }}
          />
        )}

        <ContentsViewer
          title={title}
          contents={contents}
          isEditable={isEditable}
        />
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export default PostDetail;

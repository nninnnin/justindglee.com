import React from "react";
import styled from "styled-components";

import Layout from "@components/Layout";
import ContentsViewer from "@components/ContentsViewer";

interface Props {
  pageContext: {
    post: {
      strapiId?: number;
      title: string;
      contents: string;
    };
  };
}

const PostDetail = ({ pageContext }: Props) => {
  const { post } = pageContext;

  return (
    <Layout isEditing={false}>
      <Container>
        <ContentsViewer
          title={post.title}
          contents={post.contents}
          isEditable={false}
        />
      </Container>
    </Layout>
  );
};

export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export async function config() {
  return () => {
    return {
      defer: true,
    };
  };
}

export default PostDetail;

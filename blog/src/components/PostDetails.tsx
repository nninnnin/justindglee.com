import React from "react";
import { graphql } from "gatsby";
import Layout from "@components/Layout";
import { PostQueryResult } from "@src/types";

interface Props {
  data: PostQueryResult;
}

const PostDetail = ({ data }: Props) => {
  const post = data.allStrapiPost.edges[0].node;
  const { title, contents } = post;

  return (
    <Layout>
      <h1 className="text-xl mb-2">{title}</h1>
      <p>{contents}</p>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    allStrapiPost(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          title
          contents
        }
      }
    }
  }
`;

export default PostDetail;

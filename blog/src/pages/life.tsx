import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "@components/Layout";
import { PostQueryResult } from "@src/types/index";
import PostList from "@components/PostList";
import "@styles/index.scss";

export default function Life() {
  const posts: PostQueryResult = useStaticQuery(graphql`
    query {
      allStrapiPost {
        edges {
          node {
            id
            strapiId
            title
            contents
            type
            createdAt
            updatedAt
            publishedAt
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <h1 className="text-2xl pb-2">생활</h1>

      <PostList
        posts={posts.allStrapiPost.edges
          .map(({ node }) => ({ ...node }))
          .filter((node) => node.type === "life")}
      />
    </Layout>
  );
}

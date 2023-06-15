import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "@components/Layout";
import "@styles/index.scss";
import { PostQueryResult } from "@src/types/index";
import PostList from "@components/PostList";

export default function Tech() {
  const posts: PostQueryResult = useStaticQuery(
    graphql`
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
    `
  );

  return (
    <Layout>
      <h1 className="text-2xl pb-2">기술</h1>

      <PostList
        posts={posts.allStrapiPost.edges
          .map(({ node }) => ({ ...node }))
          .filter((post) => post.type === "tech")}
      />
    </Layout>
  );
}

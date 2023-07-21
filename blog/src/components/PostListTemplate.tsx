import React from "react";

import Layout from "@components/Layout";
import PostList from "@components/PostList";
import "@styles/index.scss";
import { Post } from "@src/types";

interface Props {
  pageContext: {
    header: string;
    posts: Array<Post>;
  };
}

export default function PostListTemplate({
  pageContext: { header, posts },
}: Props) {
  return (
    <Layout>
      <h1 className="text-2xl pb-2">{header}</h1>

      <PostList posts={posts} />
    </Layout>
  );
}

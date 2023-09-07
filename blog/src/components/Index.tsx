import React from "react";
import Layout from "@components/Layout";
import { pipe, filter, take, toArray } from "@fxts/core";

import "@styles/index.scss";
import { Post } from "@src/types";
import PostList from "./ListComponents/PostList";

interface Props {
  pageContext: {
    posts: Array<Post>;
  };
}

export default function IndexPage({
  pageContext: { posts },
}: Props) {
  const techPosts = pipe(posts, take(5), toArray);

  return (
    <Layout>
      <div className="flex flex-col flex-1">
        <h1 className="header">새로운 포스트</h1>
        <PostList posts={techPosts} />
      </div>
    </Layout>
  );
}

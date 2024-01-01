import React from "react";
import Layout from "@components/Layout";
import { pipe, take, toArray } from "@fxts/core";

import "@styles/index.scss";
import { Post } from "@src/types";
import PostList from "@components/ContentsList/PostList";

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
        <h1 className="header">News</h1>
        <PostList posts={techPosts} />
      </div>
    </Layout>
  );
}

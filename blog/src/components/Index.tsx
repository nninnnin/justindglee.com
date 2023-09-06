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

const filterByType =
  (type: "tech" | "life") => (post: Post) =>
    post.type === type;

export default function IndexPage({
  pageContext: { posts },
}: Props) {
  const techPosts = pipe(
    posts,
    filter(filterByType("tech")),
    take(5),
    toArray
  );

  const lifePosts = pipe(
    posts,
    filter(filterByType("life")),
    take(5),
    toArray
  );

  return (
    <Layout>
      <div className="flex flex-col flex-1">
        <h1 className="header">새로운 포스트</h1>

        {/* <h2 className="mt-0">기술</h2> */}
        <PostList posts={techPosts} />

        {/* <h2>생활</h2>
        <PostList posts={lifePosts} /> */}
      </div>
    </Layout>
  );
}

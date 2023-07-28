import React from "react";
import Layout from "@components/Layout";
import { filter, take } from "fxjs";

import "@styles/index.scss";
import { Post } from "@src/types";
import PostList from "./ListComponents/PostList";

interface Props {
  pageContext: {
    posts: Array<Post>;
  };
}

const filterByType = (type: "tech" | "life") => (post: Post) =>
  post.type === type;

export default function IndexPage({ pageContext: { posts } }: Props) {
  return (
    <Layout>
      <div className="flex flex-col flex-1">
        <h1 className="header">새로운 글</h1>

        <h2>기술</h2>
        <PostList posts={take(5, filter(filterByType("tech"), posts))} />

        <h2>생활</h2>
        <PostList posts={take(5, filter(filterByType("life"), posts))} />
      </div>
    </Layout>
  );
}

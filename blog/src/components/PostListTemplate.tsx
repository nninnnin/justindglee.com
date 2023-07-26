import React from "react";
import { useLocation } from "@reach/router";

import Layout from "@components/Layout";
import PostList from "@components/ListComponents/PostList";
import "@styles/index.scss";
import { Post, Reference } from "@src/types";
import ReferenceList from "./ListComponents/ReferenceList";

interface Props {
  pageContext: {
    header: string;
    posts?: Array<Post>;
    references?: Array<Reference>;
  };
}

export default function PostListTemplate({
  pageContext: { header, posts, references },
}: Props) {
  const params = useLocation();

  console.log(params);

  return (
    <Layout>
      <h1 className="header">{header}</h1>

      {posts && <PostList posts={posts} />}
      {references && <ReferenceList references={references} />}
    </Layout>
  );
}

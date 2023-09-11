import React from "react";

import "@styles/index.scss";
import { Post, Reference } from "@src/types";
import Layout from "@components/Layout";
import PostList from "@components/ContentsList/PostList";
import ReferenceList from "@components/ContentsList/ReferenceList";

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
  return (
    <Layout>
      <h1 className="header">{header}</h1>

      {posts && <PostList posts={posts} />}
      {references && (
        <ReferenceList references={references} />
      )}
    </Layout>
  );
}

import React from "react";

import "@styles/index.scss";
import { Post, Reference, TagInterface } from "@src/types";
import Layout from "@components/Layout";
import PostList from "@components/ContentsList/PostList";
import ReferenceList from "@components/ContentsList/ReferenceList";
import TagFilter from "@components/TagFilter";

interface Props {
  pageContext: {
    header: string;
    posts?: Array<Post>;
    tags?: Array<TagInterface>;
    references?: Array<Reference>;
  };
}

export default function PostListTemplate({
  pageContext: { header, posts, references, tags },
}: Props) {
  return (
    <Layout>
      <h1 className="header">{header}</h1>

      {tags && <TagFilter tags={tags} />}

      {posts && <PostList posts={posts} />}

      {references && (
        <ReferenceList references={references} />
      )}
    </Layout>
  );
}

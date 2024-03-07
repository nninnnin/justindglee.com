import clsx from "clsx";
import React, { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";

import "@styles/index.scss";
import { Post, Reference, TagInterface } from "@src/types";
import Layout from "@components/Layout";
import PostList from "@components/ContentsList/PostList";
import ReferenceList from "@components/ContentsList/ReferenceList";
import TagFilter from "@components/TagFilter";

export const tagFilterState = atom({
  key: "tagFilterState",
  default: "",
});

interface Props {
  pageContext: {
    header: string;
    description?: string;
    posts?: Array<Post>;
    tags?: Array<TagInterface>;
    references?: Array<Reference>;
  };
}

export default function PostListTemplate({
  pageContext: {
    header,
    description,
    posts,
    references,
    tags,
  },
}: Props) {
  const setTagFilter = useSetRecoilState(tagFilterState);

  useEffect(() => {
    return () => setTagFilter("");
  }, []);

  return (
    <Layout>
      <h1
        className={clsx("header", description && "!pb-0")}
      >
        {header}
      </h1>

      {description && (
        <p className="text-[0.8em] mt-[10px] mb-[30px]">
          {description}
        </p>
      )}

      {tags && <TagFilter tags={tags} />}

      {posts && <PostList posts={posts} />}

      {references && (
        <ReferenceList references={references} />
      )}
    </Layout>
  );
}

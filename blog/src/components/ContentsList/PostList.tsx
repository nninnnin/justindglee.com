import React, { useEffect } from "react";
import { Link } from "gatsby";
import { Post } from "@src/types";
import ListItem from "./ListItem";

interface Props {
  posts: Array<Post>;
}

const PostList = ({ posts }: Props) => {
  return (
    <ul>
      {posts.map((post: Post) => {
        const to = !post.publicationState
          ? `/post/${post.slug}`
          : `/post/${post.slug}/edit`;

        return (
          <Link key={`key-${post.id}`} to={to}>
            <ListItem
              index={post.index}
              postId={post.id}
              description={post.title}
              tags={post.tags}
              publicationState={post.publicationState}
            />
          </Link>
        );
      })}
    </ul>
  );
};

export default PostList;

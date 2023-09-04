import React from "react";
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
        return (
          <Link
            key={`key-${post.id}`}
            to={`/${post.type}/${post.slug}`}
          >
            <ListItem
              index={post.index}
              description={post.title}
              tags={post.tags}
            />
          </Link>
        );
      })}
    </ul>
  );
};

export default PostList;

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
          <Link to={`/${post.type}/${post.index}`} key={`key-${post.id}`}>
            <ListItem index={post.index} description={post.title} />
          </Link>
        );
      })}
    </ul>
  );
};

export default PostList;

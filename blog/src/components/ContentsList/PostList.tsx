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
        let to = `/post/${post.slug}`;

        if (!post.publishedAt) {
          to = `/post/${post.slug}/edit`;
        }

        return (
          <Link key={`key-${post.id}`} to={to}>
            <ListItem
              index={post.index}
              postId={post.id}
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

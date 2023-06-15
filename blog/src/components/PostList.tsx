import React from "react";
import { Link } from "gatsby";

import { Post } from "@src/types/index";

interface Props {
  posts: Array<Post>;
}

const PostList = ({ posts }: Props) => {
  return (
    <ul className="bg-red">
      {posts.map((post: Post, postIndex) => {
        return (
          <Link to={`/post/${post.id}`} key={`key-${post.id}`}>
            <li className="cursor-pointer m-2">
              <h2 className="font-medium">
                {postIndex + 1} | {post.title}{" "}
              </h2>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default PostList;

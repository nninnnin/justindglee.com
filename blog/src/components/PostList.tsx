import React from "react";
import { Link } from "gatsby";
import { Post } from "@src/types";

interface Props {
  posts: Array<Post>;
}

const PostList = ({ posts }: Props) => {
  return (
    <ul className="bg-red">
      {posts.map((post: Post) => {
        return (
          <Link to={`/${post.type}/${post.index}`} key={`key-${post.id}`}>
            <li className="cursor-pointer m-2">
              <h2 className="font-medium">
                {post.index} | {post.title}{" "}
              </h2>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default PostList;

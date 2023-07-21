import styled from "styled-components";
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
                <PostIndex>{post.index}</PostIndex> |{" "}
                <PostTitle>{post.title}</PostTitle>
              </h2>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

const PostIndex = styled.div`
  display: inline-block;
  min-width: 0.8em;
`;

const PostTitle = styled.div`
  display: inline-block;
  margin-left: 1em;
`;

export default PostList;

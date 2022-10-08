import React from "react";
import { Post } from "@src/types/index";
import { Link } from "gatsby";

interface Props {
  posts: Array<Post>;
}

const PostList = ({ posts }: Props) => {
  return (
    <ul className="bg-red">
      {posts.map((post: Post, postIndex) => {
        const contents = post.attributes.contents;

        return (
          <Link to={`/post/${post.id}`}>
            <li className="cursor-pointer m-2" key={post.id}>
              <h2 className="font-medium">
                {postIndex + 1} | {post.attributes.title}{" "}
                <span className="bg-gradient-to-r from-neutral-500 via-neutral-400 via-neutral-200 to-neutral-50 bg-clip-text text-transparent">
                  {contents.length > 20
                    ? contents.slice(0, 20) + ".."
                    : contents}
                </span>
              </h2>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default PostList;

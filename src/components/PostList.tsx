import React from "react";
import { Post } from "@src/types/index";
import { Link } from "gatsby";

interface Props {
  posts: Array<Post>;
}

const PostList = ({ posts }: Props) => {
  return (
    <ul className="bg-red">
      {posts.map((post: Post) => {
        const content = post.attributes.contents.slice(0, 20);

        console.log(post);

        return (
          <Link to={`/post/${post.id}`}>
            <li className="cursor-pointer m-2" key={post.id}>
              <h2 className="font-medium">{post.attributes.title}</h2>
              <p className="">
                {content.length >= 20 ? content + ".." : content}
              </p>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default PostList;

import React from "react";
import { Link } from "gatsby";
import { Post } from "@src/types";
import ListItem from "./ListItem";
import { useRecoilValue } from "recoil";
import { tagFilterState } from "@components/PostListTemplate";

interface Props {
  posts: Array<Post>;
}

const PostList = ({ posts }: Props) => {
  const tagFilter = useRecoilValue(tagFilterState);

  return (
    <ul>
      {posts
        .filter((post) => {
          if (!tagFilter) return true;
          if (!post.tags) return false;

          return post.tags.find(
            (tag) => tag.name === tagFilter
          );
        })
        .map((post: Post) => {
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

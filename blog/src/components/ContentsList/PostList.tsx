import clsx from "clsx";
import React from "react";
import { Link } from "gatsby";
import { useRecoilValue } from "recoil";
import { format } from "date-fns";

import { Post } from "@src/types";
import ListItem from "./ListItem";

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
        .map(
          ({
            id,
            tags,
            title,
            slug,
            publicationState,
            publishedAt,
          }: Post) => {
            const to = !publicationState
              ? `/post/${slug}`
              : `/post/${slug}/edit`;

            return (
              <Link key={`key-${id}`} to={to}>
                <ListItem postId={id}>
                  <div
                    className={clsx(
                      "w-[80%]",
                      "flex flex-col justify-between items-start"
                    )}
                  >
                    <ListItem.Description>
                      {title}
                    </ListItem.Description>

                    {tags && (
                      <ul className="flex flex-wrap justify-end">
                        {tags.map((tag) => {
                          return (
                            <ListItem.Tag
                              key={tag.id}
                              name={tag.name}
                            />
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {publicationState ? (
                    <ListItem.PublicationState
                      publicationState={publicationState}
                    />
                  ) : (
                    <ListItem.Tag
                      name={`${format(
                        new Date(publishedAt),
                        "MMM d, yyyy"
                      )}`}
                    />
                  )}
                </ListItem>
              </Link>
            );
          }
        )}
    </ul>
  );
};

export default PostList;

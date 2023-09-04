import React from "react";
import axios from "axios";
import qs from "qs";
import { map, pipe, take, toArray } from "@fxts/core";
import styled from "styled-components";
import clsx from "clsx";
import { useLocation } from "@reach/router";

import { Post } from "@src/types";
import Authorizer from "@components/Authorizer";
import Layout from "@components/Layout";
import PostList from "@components/ListComponents/PostList";

interface Props {
  serverData: {
    posts: Array<Post>;
    totalPages: number;
    currentPage: number;
  };
}

const PostListPage = ({
  serverData: { posts, totalPages, currentPage },
}: Props) => {
  const { search, pathname } = useLocation();

  const parsedQuery = qs.parse(search.split("?")[1]);

  const { publicationState } = parsedQuery;

  const pages = pipe(
    (function* generatePage() {
      let i = 0;
      while (++i) yield i;
    })(),
    take(totalPages),
    map((page) => (
      <a
        href={`${pathname}?${qs.stringify(
          { ...parsedQuery, page },
          { encode: false }
        )}`}
        key={`page-${page}`}
      >
        <span
          className={clsx(
            "p-1",
            page === currentPage && "underline"
          )}
        >
          {page}
        </span>
      </a>
    )),
    toArray
  );

  return (
    <Authorizer>
      <Layout>
        <Filters>
          <a href="/posts">
            <li
              className={clsx(
                !publicationState && "underline"
              )}
            >
              All
            </li>
          </a>

          <a href="/posts?publicationState=draft">
            <li
              className={clsx(
                publicationState === "draft" && "underline"
              )}
            >
              Draft
            </li>
          </a>

          <a href="/posts?publicationState=published">
            <li
              className={clsx(
                publicationState === "published" &&
                  "underline"
              )}
            >
              Published
            </li>
          </a>

          <li className="ml-auto !mr-0">{pages}</li>
        </Filters>
        <PostList posts={posts} />
      </Layout>
    </Authorizer>
  );
};

export default PostListPage;

export async function getServerData(ctx: {
  query: Record<string, string>;
}) {
  let { publicationState, page } = ctx.query;

  const filters = {
    slug: { $notNull: true },
  };

  if (publicationState === "draft") {
    Object.assign(filters, {
      publishedAt: { $null: true },
    });

    publicationState = "preview";
  } else if (publicationState === "published") {
    publicationState = "live";
  } else {
    publicationState = "preview";
  }

  const query = qs.stringify(
    {
      sort: "createdAt:desc",
      publicationState,
      filters,
      pagination: {
        page: page ? Number(page) : 1,
        pageSize: 10,
      },
    },
    { encode: false }
  );

  const {
    data: { data, meta },
  }: {
    data: {
      data: Array<{
        id: number;
        attributes: Omit<Post, "id">;
      }>;
      meta: {
        pagination: {
          page: number;
          pageSize: number;
          pageCount: number;
          total: number;
        };
      };
    };
  } = await axios(
    `${process.env.GATSBY_STRAPI_API_URL}/api/posts?${query}`,
    {
      headers: {
        authorization: `Bearer ${process.env.GATSBY_STRAPI_TOKEN}`,
      },
    }
  );

  const posts = pipe(
    data,
    map(({ id, attributes }) => ({ id, ...attributes })),
    toArray
  );

  return {
    props: {
      posts,
      totalPages: meta.pagination.pageCount,
      currentPage: meta.pagination.page,
    },
  };
}

const Filters = styled.ul`
  display: flex;
  margin-bottom: 1em;

  & li {
    margin-right: 0.5em;
  }
`;

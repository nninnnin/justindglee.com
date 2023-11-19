import React from "react";
import qs from "qs";
import { map, pipe, take, toArray } from "@fxts/core";
import styled from "styled-components";
import clsx from "clsx";
import { useLocation } from "@reach/router";
import { Link } from "gatsby";

import Authorizer from "@components/Authorizer";
import Layout from "@components/Layout";
import PostList from "@components/ContentsList/PostList";
import usePosts from "@src/hooks/usePosts";
import Loading from "@components/common/Loading";

const PostListPage = () => {
  const { search, pathname } = useLocation();
  const parsedQuery = qs.parse(search.split("?")[1]);

  const { publicationState, page } = parsedQuery as {
    publicationState: string | undefined;
    page: string | undefined;
  };

  const [{ posts, totalPages, currentPage }, loading] =
    usePosts({
      publicationState,
      page: Number(page),
    });

  const pages = pipe(
    (function* generatePage() {
      let i = 0;
      while (++i) yield i;
    })(),
    take(totalPages),
    map((page) => (
      <Link
        key={`page-${page}`}
        to={`${pathname}?${qs.stringify(
          { ...parsedQuery, page },
          { encode: false }
        )}`}
      >
        <span
          className={clsx(
            "p-1",
            page === currentPage && "underline"
          )}
        >
          {page}
        </span>
      </Link>
    )),
    toArray
  );

  const triggerDeployment = async () => {
    const result = await fetch("/api/deploy");

    if (!result.ok) {
      alert("Failed");
    }

    alert("Nice.");
  };

  return (
    <Authorizer>
      <Layout>
        <Filters>
          <Link to={`${pathname}`}>
            <li
              className={clsx(
                !publicationState && "underline"
              )}
            >
              All
            </li>
          </Link>

          <Link to={`${pathname}?publicationState=draft`}>
            <li
              className={clsx(
                publicationState === "draft" && "underline"
              )}
            >
              Draft
            </li>
          </Link>

          <Link
            to={`${pathname}?publicationState=published`}
          >
            <li
              className={clsx(
                publicationState === "published" &&
                  "underline"
              )}
            >
              Published
            </li>
          </Link>

          <li
            className={clsx(
              publicationState === "published" &&
                "underline",
              "cursor-pointer"
            )}
            onClick={async () => await triggerDeployment()}
          >
            Deploy!
          </li>

          {loading ? (
            <></>
          ) : (
            <li className="ml-auto !mr-0">{pages}</li>
          )}
        </Filters>

        {loading ? (
          <Loading className="relative !bg-transparent">
            로딩중입니다..
          </Loading>
        ) : (
          <PostList posts={posts} />
        )}
      </Layout>
    </Authorizer>
  );
};

export default PostListPage;

const Filters = styled.ul`
  display: flex;
  margin-bottom: 1em;

  & li {
    margin-right: 0.5em;
  }
`;

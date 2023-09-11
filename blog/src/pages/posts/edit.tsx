import React from "react";
import qs from "qs";
import { map, pipe, take, toArray } from "@fxts/core";
import styled from "styled-components";
import clsx from "clsx";
import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import { motion } from "framer-motion";

import Authorizer from "@components/Authorizer";
import Layout from "@components/Layout";
import PostList from "@components/ContentsList/PostList";
import usePosts from "@src/hooks/usePosts";

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

          {loading ? (
            <></>
          ) : (
            <li className="ml-auto !mr-0">{pages}</li>
          )}
        </Filters>

        {loading ? (
          <div className="w-full h-full grid place-items-center">
            <motion.div
              className="bg-red-400 w-10 h-10"
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: [
                  "20%",
                  "20%",
                  "50%",
                  "50%",
                  "20%",
                ],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </div>
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

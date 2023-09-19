import React from "react";

import "@styles/index.scss";
import { Post, Reference } from "@src/types";
import Layout from "@components/Layout";
import PostList from "@components/ContentsList/PostList";
import ReferenceList from "@components/ContentsList/ReferenceList";
import { map, pipe, take, toArray } from "@fxts/core";
import clsx from "clsx";

interface Props {
  pageContext: {
    header: string;
    posts?: Array<Post>;
    references?: Array<Reference>;
  };
}

export default function PostListTemplate({
  pageContext: { header, posts, references },
}: Props) {
  const list = pipe(
    (function* () {
      let i = 0;

      while (true) {
        yield i;
        i++;
      }
    })(),
    map((i) => (
      <li
        className={clsx(
          "glassmorph-listitem-small rounded-md",
          "mr-2 p-2 py-1",
          "relative z-1",
          "text-[0.8rem]",
          "text-[rgba(255,255,255,0.3)]",
          "hover:text-white",
          "text-shadow-none",
          "whitespace-nowrap",
          "cursor-pointer"
        )}
      >
        태그들 (19)
      </li>
    )),
    take(20),
    toArray
  );

  console.log(list);

  return (
    <Layout>
      <h1 className="header">{header}</h1>

      <div
        className={clsx("relative", "")}
        onClick={(e) => {
          // 어떻게~
          console.log(
            e.currentTarget.children[0].children[9].scrollIntoView(
              {
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              }
            )
          );
        }}
      >
        <ul
          className={clsx(
            "flex w-full",
            "mb-4 mt-[-12px] p-[16px] pl-0",
            "overflow-x-scroll",
            "min-h-[50px]"
          )}
        >
          {list}
        </ul>

        <span
          className={clsx(
            "absolute right-0 top-0",
            "text-[0.9rem] text-white/80 hover:text-white transition duration-100",
            "w-[30px] min-h-[63.5px]",
            "mb-4 mt-[-12px] p-2 py-[16px]",
            "flex items-center justify-end",
            "cursor-pointer select-none"
          )}
        >
          →
        </span>
      </div>

      {posts && <PostList posts={posts} />}

      {references && (
        <ReferenceList references={references} />
      )}
    </Layout>
  );
}

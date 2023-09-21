import axios from "axios";
import { useEffect, useState } from "react";
import { pipe, map, toArray, toAsync } from "@fxts/core";
import qs from "qs";
import {
  Post,
  PublicationStates,
  TagInterface,
} from "@src/types";
import strapiClient from "./strapiClient";

interface Props {
  publicationState?: string;
  page: number;
}

interface Result {
  posts: Array<Post>;
  totalPages: number;
  currentPage: number;
}

const getPosts = async ({
  publicationState,
  page,
}: Props) => {
  const filters = {
    slug: { $notNull: true },
  };

  let publicationStateQuery: "preview" | "live";

  if (publicationState === "draft") {
    Object.assign(filters, {
      publishedAt: { $null: true },
    });

    publicationStateQuery = "preview";
  } else if (publicationState === "published") {
    publicationStateQuery = "live";
  } else {
    publicationStateQuery = "preview";
  }

  const query = qs.stringify(
    {
      sort: "createdAt:desc",
      publicationState: publicationStateQuery,
      filters,
      pagination: {
        page: page ? Number(page) : 1,
        pageSize: 10,
      },
      populate: ["tags"],
    },
    { encode: false }
  );

  const {
    data: { data, meta },
  }: {
    data: {
      data: Array<{
        id: number;
        attributes: Omit<Post, "id" | "tags"> & {
          tags: {
            data: Array<{
              id: number;
              attributes: Omit<TagInterface, "id">;
            }>;
          };
        };
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
  } = await strapiClient(`/api/posts?${query}`);

  const posts = await pipe(
    data,
    map(({ id, attributes }) => {
      const tags = [
        ...attributes.tags.data.map(
          ({ id, attributes }) => {
            const tag: TagInterface = {
              id,
              ...attributes,
            };

            return tag;
          }
        ),
      ];

      const post = {
        id,
        ...{
          ...attributes,
          tags,
        },
      };

      return post;
    }),
    toArray,
    mapDeployed
  );

  return {
    posts,
    totalPages: meta.pagination.pageCount,
    currentPage: meta.pagination.page,
  };
};

const usePosts = ({
  publicationState,
  page,
}: Props): [Result, boolean] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Result>({
    posts: [],
    totalPages: 0,
    currentPage: 0,
  });

  useEffect(() => {
    setLoading(true);

    (async () => {
      const result = await getPosts({
        publicationState,
        page,
      });

      setPosts(result);
      setLoading(false);
    })();
  }, [publicationState, page]);

  return [posts, loading];
};

export default usePosts;

async function mapDeployed(posts: Array<Post>) {
  return await Promise.all(
    posts.map(async (post) => {
      try {
        await axios.get(
          `${
            process.env.NODE_ENV === "development"
              ? "https://cors-anywhere.herokuapp.com/https://justindglee.com"
              : ""
          }/post/${post.slug}`,
          {
            headers: {
              mode: "no-cors",
              "access-control-allow-origin": "*",
            },
          }
        );

        // TODO: 업데이트를 했는데 반영이 되지 않았다? : updated
        // 마지막 빌드 시간 가져오기 (https://justindglee.com)
        // 해당 포스트의 updatedAt 과 비교

        let publicationState: PublicationStates;

        publicationState = "published";

        return { ...post, publicationState };
      } catch (error) {
        let publicationState: PublicationStates =
          post.publishedAt ? "publishing" : "draft";

        return {
          ...post,
          publicationState,
        };
      }
    })
  );
}

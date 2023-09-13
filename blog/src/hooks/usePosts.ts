import { useEffect, useState } from "react";
import { pipe, map, toArray } from "@fxts/core";
import qs from "qs";
import axios from "axios";
import { Post, TagInterface } from "@src/types";

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
    map(({ id, attributes }) => {
      const tags = [
        ...attributes.tags.data.map(
          ({ id, attributes }) => {
            const tag: TagInterface = {
              id: String(id),
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
    toArray
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

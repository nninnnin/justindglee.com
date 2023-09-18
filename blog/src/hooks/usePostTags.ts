import { useState, useEffect } from "react";

import strapiClient from "@hooks/strapiClient";
import {
  Populate,
  Post,
  StrapiResponseData,
  TagInterface,
} from "@src/types";
import { stripStrapiResponse } from "@src/utils";

const usePostTags = (postId: number) => {
  const [postTags, setPostTags] =
    useState<Array<TagInterface> | null>([]);
  const [loading, setLoading] = useState(false);

  const getPostTags = async () => {
    setLoading(true);

    const {
      data,
    }: {
      data: StrapiResponseData<Populate<Post, "tags">>;
    } = await strapiClient.get(
      `/api/posts/${postId}?populate[0]=tags`
    );

    const tags = data.data.attributes.tags;

    const postTags = stripStrapiResponse(tags) as
      | TagInterface[]
      | null;

    setLoading(false);
    setPostTags(postTags);
  };

  useEffect(() => {
    (async function () {
      await getPostTags();
    })();
  }, []);

  const registerTag = async (tagId: number) => {
    setLoading(true);

    await strapiClient.put(`/api/posts/${postId}`, {
      data: {
        tags: {
          connect: [tagId],
        },
      },
    });

    await getPostTags();
  };

  const unregisterTag = async (tagId: number) => {
    setLoading(true);

    await strapiClient.put(`/api/posts/${postId}`, {
      data: {
        tags: {
          disconnect: [tagId],
        },
      },
    });

    await getPostTags();
  };

  return { postTags, registerTag, unregisterTag, loading };
};

export default usePostTags;

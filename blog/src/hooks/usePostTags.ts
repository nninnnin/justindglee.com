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

  useEffect(() => {
    (async function () {
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

      setPostTags(postTags);
    })();
  }, []);

  return postTags;
};

export default usePostTags;

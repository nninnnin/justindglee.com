import { useEffect, useState } from "react";
import strapiClient from "./strapiClient";
import {
  Post,
  StrapiResponseData,
  TagInterface,
} from "@src/types";

const useTags = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<Array<TagInterface>>([]);

  useEffect(() => {
    (async function () {
      const {
        data: { data },
      }: {
        data: {
          data: Array<{
            id: number;
            attributes: {
              name: string;
              createdAt: string;
              updatedAt: string;
              posts: StrapiResponseData<Array<Post>>;
            };
          }>;
        };
      } = await strapiClient.get(
        "/api/tags?populate[posts][fields][0]=id&populate[posts][publicationState]=preview"
      );

      const tags = data.map(({ id, attributes }) => ({
        id,
        ...{
          ...attributes,
          posts: [
            ...attributes.posts.data.map(({ id }) => id),
          ],
        },
      }));

      setLoading(false);
      setTags(tags);
    })();
  }, []);

  const addTag = async (tagName: string) => {
    setLoading(true);

    const result = await strapiClient.post("api/tags", {
      data: {
        name: tagName,
      },
    });

    const newTag = {
      id: result.data.data.id,
      ...result.data.data.attributes,
    };

    setLoading(false);
    setTags((prev) => [...prev, newTag]);
  };

  const removeTag = async (
    tagId: number,
    posts: Array<number>
  ) => {
    try {
      setLoading(true);

      if (posts) {
        await Promise.all(
          posts.map(async (postId) => {
            return await strapiClient.put(
              `api/posts/${postId}`,
              {
                data: {
                  tags: {
                    disconnect: [tagId],
                  },
                },
              }
            );
          })
        );
      }

      await strapiClient.delete(`api/tags/${tagId}`);

      setLoading(false);
      setTags((prev) =>
        prev.filter((tag) => tag.id !== tagId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { tags, loading, addTag, removeTag };
};

export default useTags;

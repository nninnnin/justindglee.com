import { useEffect, useState } from "react";
import strapiClient from "./strapiClient";
import { TagInterface } from "@src/types";

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
            };
          }>;
        };
      } = await strapiClient.get("/api/tags");

      const tags = data.map(({ id, attributes }) => ({
        id,
        ...attributes,
      }));

      setLoading(false);
      setTags(tags);
    })();
  }, []);

  return { tags, loading };
};

export default useTags;

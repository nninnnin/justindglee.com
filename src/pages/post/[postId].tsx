import React, { useEffect, useState } from "react";

import Layout from "@components/Layout";

const PostDetail = ({ postId }: { postId: string }) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.GATSBY_STRAPI_API_URL}/api/posts/${postId}`,
        {
          headers: {
            authorization: `Bearer ${process.env.GATSBY_STRAPI_TOKEN || ""}`,
          },
        }
      );

      const result = await response.json();

      setTitle(result.data.attributes.title);
      setContents(result.data.attributes.contents);
    })();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl">{title}</h1>
      <p className="py-3">{contents}</p>
    </Layout>
  );
};

export default PostDetail;

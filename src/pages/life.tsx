import axios from "axios";
import React, { useEffect } from "react";
import Layout from "@components/Layout";
import "@styles/index.scss";

export default function IndexPage() {
  useEffect(() => {
    (async () => {
      const {
        data: { data: posts },
      } = await axios(`${process.env.STRAPI_API_URL}/api/posts`, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      });

      console.log(posts);
    })();
  }, []);

  return <Layout contents={"이곳은 생활"} />;
}

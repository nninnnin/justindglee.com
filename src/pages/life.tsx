import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import "@styles/index.scss";
import { Post } from "@src/types/index";
import PostList from "@components/PostList";

export default function Life() {
  const [lifePosts, setLifePosts] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        data: { data: posts },
      } = await axios(`${process.env.GATSBY_STRAPI_API_URL}/api/posts`, {
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_STRAPI_TOKEN}`,
        },
      });

      setLifePosts(posts.filter((el: Post) => el.attributes.type === "life"));
    })();
  }, []);

  return (
    <Layout>
      이곳은 생활
      <br />
      <br />
      <PostList posts={lifePosts} />
    </Layout>
  );
}

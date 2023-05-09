import axios from "axios";
import React, { useState, useEffect } from "react";

import Layout from "@components/Layout";
import "@styles/index.scss";
import { Post } from "@src/types/index";
import PostList from "@components/PostList";

export default function Tech() {
  const [techPosts, setTechPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        data: { data: posts },
      } = await axios(`${process.env.GATSBY_STRAPI_API_URL}/api/posts`, {
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_STRAPI_TOKEN}`,
        },
      });

      setTechPosts(posts.filter((el: Post) => el.attributes.type === "tech"));
    })();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl pb-2">기술</h1>

      <PostList posts={techPosts} />
    </Layout>
  );
}

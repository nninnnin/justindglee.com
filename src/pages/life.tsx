import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import "@styles/index.scss";
import { Post } from "@src/types/index";

export default function IndexPage() {
  const [lifePosts, setLifePosts] = useState([]);

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

      setLifePosts(posts.filter((el: Post) => el.attributes.type === "life"));
    })();
  }, []);

  return (
    <Layout>
      이곳은 생활
      <br />
      <br />
      <ul>
        {lifePosts.map(
          (post: {
            attributes: { title: string; contents: string; createdAt: string };
          }) => {
            return (
              <li className="cursor-pointer m-2">
                제목: {post.attributes.title} / 내용: {post.attributes.contents}
              </li>
            );
          }
        )}
      </ul>
    </Layout>
  );
}

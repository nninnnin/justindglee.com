import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import "@styles/index.scss";
import { Post } from "@src/types/index";

export default function IndexPage() {
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

      console.log(posts);

      setTechPosts(posts.filter((el: Post) => el.attributes.type === "tech"));
    })();
  }, []);

  return (
    <Layout>
      이곳은 기술
      <br />
      <br />
      <ul className="bg-red">
        {techPosts.map(
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

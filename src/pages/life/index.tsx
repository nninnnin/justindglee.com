import axios from "axios";
import React, { useEffect } from "react";
import Navigation from "@components/Navigation";
import "@styles/index.scss";

export default function IndexPage() {
  useEffect(() => {
    (async () => {
      const posts = await axios(`${process.env.STRAPI_API_URL}/api/posts`, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      });

      console.log(posts);
    })();
  }, []);

  return (
    <div className="w-screen h-screen overflow-scroll flex flex-row">
      <Navigation />
    </div>
  );
}

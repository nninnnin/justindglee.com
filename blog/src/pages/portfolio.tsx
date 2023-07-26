import React, { useLayoutEffect, useRef } from "react";
import Layout from "@components/Layout";

const portfolio = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useLayoutEffect(() => {
    console.log(iframeRef.current);
  }, []);

  return (
    <Layout hasPadding={false}>
      <iframe
        ref={iframeRef}
        src="https://justindglee.netlify.com"
        width={"100%"}
        height={"100%"}
      ></iframe>
    </Layout>
  );
};

export default portfolio;

import React from "react";
import Layout from "@components/Layout";
import ReactMarkdown from "react-markdown";

interface Props {
  pageContext: {
    post: {
      title: string;
      contents: string;
    };
  };
}

const PostDetail = ({ pageContext }: Props) => {
  const { post } = pageContext;
  const { title, contents } = post;

  return (
    <Layout>
      <h1 className="text-xl mb-2">{title}</h1>
      <p>
        <ReactMarkdown>{contents}</ReactMarkdown>
      </p>
    </Layout>
  );
};

export default PostDetail;

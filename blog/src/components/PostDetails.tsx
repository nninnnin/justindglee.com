import styled from "styled-components";
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

const CustomParagraph = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      margin: "10px 0",
      wordBreak: "keep-all",
      lineHeight: "1.8em",
    }}
  >
    {children}
  </p>
);

const CustomBlockquote = ({ children }: { children: React.ReactNode }) => (
  <blockquote
    style={{ margin: "12px 0", backgroundColor: "lawngreen", padding: "1.5em" }}
  >
    {children}
  </blockquote>
);

const H1 = styled.h1`
  font-size: 2.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

const H2 = styled.h2`
  font-size: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

const H3 = styled.h3`
  font-size: 1.2em;
  margin-bottom: 0.5em;
`;

const Image = styled.img`
  margin: 2em 0;
`;
const HR = styled.hr`
  margin: 2em 0;
`;

const Contents = styled.p`
  font-size: 0.9em;
`;

const PostDetail = ({ pageContext }: Props) => {
  const { post } = pageContext;
  const { title, contents } = post;

  return (
    <Layout>
      <h1 className="text-[1.8em] mb-2">{title}</h1>
      <Contents>
        <ReactMarkdown
          components={{
            p: CustomParagraph,
            blockquote: CustomBlockquote,
            h1: H1 as typeof CustomParagraph,
            h2: H2 as typeof CustomParagraph,
            h3: H3 as typeof CustomParagraph,
            img: Image as typeof CustomParagraph,
            hr: HR as typeof CustomParagraph,
          }}
          remarkPlugins={[]}
        >
          {contents}
        </ReactMarkdown>
      </Contents>
    </Layout>
  );
};

export default PostDetail;

import styled from "styled-components";
import React from "react";
import ReactMarkdown from "react-markdown";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import { useLocation } from "@reach/router";
import { routes } from "./Navigation";

import Layout from "@components/Layout";

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
    className="text-white"
    style={{
      margin: "10px 0",
      overflowWrap: "break-word",
      lineHeight: "1.8em",
    }}
  >
    {children}
  </p>
);

const Blockquote = styled.blockquote`
  margin: 12px 0;
  padding: 0 1.5em;
  border-left: 3px solid gainsboro;
`;

const H1 = styled.h1`
  font-size: 2.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

const H3 = styled.h3`
  font-size: 1.2em;
  margin-bottom: 0.5em;
`;

const Image = styled.img`
  margin: 2em 0;
  border: 1px solid gainsboro;
  background-color: #fff;
`;

const HR = styled.hr`
  margin: 2em 0;
`;

const UL = styled.ul.withConfig({
  shouldForwardProp: (prop) => !["ordered"].includes(prop),
})`
  padding-left: 1.3rem;
  list-style-type: decimal;

  & > li {
    margin-top: 4px;
  }
`;

const PostDetail = ({ pageContext }: Props) => {
  const { post } = pageContext;
  const { title, contents } = post;

  const params = useLocation();

  const postType =
    Object.values(routes).find(({ route }) => params.pathname.includes(route))
      ?.title ?? "";

  return (
    <Layout>
      <h1 className="header">
        <span>{postType} : </span>
        {title}
      </h1>

      <div>
        <ReactMarkdown
          components={{
            p: CustomParagraph,
            blockquote: Blockquote as typeof CustomParagraph,
            h1: H1 as HeadingComponent,
            h3: H3 as HeadingComponent,
            img: Image as typeof CustomParagraph,
            hr: HR as typeof CustomParagraph,
            ul: UL as typeof CustomParagraph,
          }}
          remarkPlugins={[]}
        >
          {contents}
        </ReactMarkdown>
      </div>
    </Layout>
  );
};

export default PostDetail;

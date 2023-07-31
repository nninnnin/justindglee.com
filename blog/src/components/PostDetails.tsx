import styled from "styled-components";
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import { useLocation } from "@reach/router";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

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

const PostDetail = ({ pageContext }: Props) => {
  const { post } = pageContext;
  const { title, contents } = post;

  const params = useLocation();

  console.log(params);

  const postType = Object.values(routes).find(({ route }) =>
    params.pathname.includes(route)
  );

  return (
    <Layout>
      <h1 className="header">
        {/* <span>{postType} : </span> */}
        {title}
      </h1>

      <div className="post-details">
        <ReactMarkdown
          components={{
            p: CustomParagraph,
            blockquote: Blockquote as typeof CustomParagraph,
            h1: H1 as HeadingComponent,
            h2: H2 as HeadingComponent,
            h3: H3 as HeadingComponent,
            img: Image as typeof CustomParagraph,
            hr: HR as typeof CustomParagraph,
            ul: UL as typeof CustomParagraph,
            iframe: Iframe,
            a: Anchor,
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              const matched = match ? match[1] : "typescript";

              return !inline ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  language={matched}
                  PreTag="div"
                  className="glassmorph rounded-md !my-5"
                />
              ) : (
                <code {...props} className="glassmorph p-1 rounded-md mx-1">
                  {children}
                </code>
              );
            },
          }}
          rehypePlugins={[rehypeRaw]}
        >
          {contents}
        </ReactMarkdown>
      </div>
    </Layout>
  );
};

const CustomParagraph = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-white"
    style={{
      margin: "10px 0",
      wordBreak: "keep-all",
      lineHeight: "1.8em",
    }}
  >
    {children}
  </p>
);

const Blockquote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="glassmorph border-l-2 my-5 p-3 pl-5 pr-2">
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
  background-color: #fff;

  display: block;
  margin: 2em auto;
`;

const HR = styled.hr`
  margin: 2em 0;
`;

const UL = styled.ul.withConfig({
  shouldForwardProp: (prop) => !["ordered"].includes(prop),
})`
  padding-left: 1.3rem;
  list-style-type: disc;

  & > li {
    margin-top: 4px;
  }
`;

const FrameWrapper = styled.div<{ ratio: number }>`
  width: 100%;
  padding-top: ${({ ratio }) => `${ratio}%`};

  position: relative;
`;

const Frame = styled.iframe`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
`;

const Iframe = ({
  width,
  height,
  ...props
}: {
  width: number;
  height: number;
}) => {
  const ratio = (height / width) * 100;

  return (
    <FrameWrapper className="glassmorph" ratio={ratio}>
      <Frame {...props} />
    </FrameWrapper>
  );
};

const Anchor = styled.a`
  text-decoration: underline;
`;

export default PostDetail;

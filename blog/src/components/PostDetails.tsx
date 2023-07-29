import styled from "styled-components";
import React from "react";
import ReactMarkdown from "react-markdown";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import { useLocation } from "@reach/router";
import { routes } from "./Navigation";
import rehypeRaw from "rehype-raw";

import Layout from "@components/Layout";
import { Link } from "gatsby-link";

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
      wordBreak: "keep-all",
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
  border: 1px solid gainsboro;
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
  list-style-type: decimal;

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

const PostDetail = ({ pageContext }: Props) => {
  const { post } = pageContext;
  const { title, contents } = post;

  const params = useLocation();

  const postType = Object.values(routes).find(({ route }) =>
    params.pathname.includes(route)
  );

  return (
    <Layout>
      <Link className="underline" to={postType?.route ?? ""}>
        {postType?.title ?? ""}
      </Link>
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
            h3: H3 as HeadingComponent,
            img: Image as typeof CustomParagraph,
            hr: HR as typeof CustomParagraph,
            ul: UL as typeof CustomParagraph,
            iframe: Iframe, // TODO: typing
            a: Anchor,
          }}
          rehypePlugins={[rehypeRaw]}
        >
          {contents}
        </ReactMarkdown>
      </div>
    </Layout>
  );
};

export default PostDetail;

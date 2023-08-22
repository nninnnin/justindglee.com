import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import rehypeRaw from "rehype-raw";

import {
  H1,
  H2,
  H3,
  Image,
  Anchor,
  Frame,
  FrameWrapper,
  HR,
  UL,
} from "./styles";

interface Props {
  isEditable: boolean;
  title: string;
  contents: string;
}

const ContentsViewer = ({ isEditable, title, contents }: Props) => {
  return (
    <div
      className={`flex-1 h-full ${isEditable && "p-5"} ${
        isEditable && "contents-viewer"
      } overflow-auto`}
    >
      <h1 className="header">{title}</h1>

      <div className="markdown-contents">
        <ReactMarkdown
          components={{
            p: Paragraph,
            blockquote: Blockquote as typeof Paragraph,
            h1: H1 as HeadingComponent,
            h2: H2 as HeadingComponent,
            h3: H3 as HeadingComponent,
            img: Image as typeof Paragraph,
            hr: HR as typeof Paragraph,
            ul: UL as typeof Paragraph,
            iframe: Iframe,
            a: Anchor,
            code: ({ inline, className, children }) => {
              const match = /language-(\w+)/.exec(className || "");
              const matched = match ? match[1] : "typescript";

              if (inline)
                return (
                  <code className="glassmorph p-1 rounded-md mx-1">
                    {children}
                  </code>
                );

              return (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  language={matched}
                  PreTag="div"
                  className="glassmorph rounded-md !my-5 w-full"
                  wrapLongLines={true}
                />
              );
            },
          }}
          rehypePlugins={[rehypeRaw]}
        >
          {contents}
        </ReactMarkdown>
      </div>

      <footer className="footer mt-4 py-20 mx-auto w-full flex border-t-2 border-dashed select-none pointer-events-none">
        <input
          className="text-blue-500 mx-auto w-[12.5em]"
          value="** 댓글 기능이 준비중입니다 **"
        />
      </footer>
    </div>
  );
};

const Paragraph = ({ children }: { children: React.ReactNode }) => (
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

const Iframe = ({
  ratio,
  width,
  height,
  ...props
}: {
  ratio?: string;
  width: number;
  height: number;
}) => {
  const frameRatio = ratio
    ? Number(ratio)
    : (Number(height) / Number(width)) * 100;

  return (
    <>
      <FrameWrapper className="glassmorph" ratio={frameRatio}>
        <Frame {...props} ratio={frameRatio} />
      </FrameWrapper>
    </>
  );
};

export default ContentsViewer;

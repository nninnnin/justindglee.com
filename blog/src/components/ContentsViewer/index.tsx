import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import rehypeRaw from "rehype-raw";
import clsx from "clsx";
import { useRecoilState } from "recoil";

import {
  H1,
  H2,
  H3,
  Image,
  Anchor,
  HR,
  UL,
} from "./styles";
import { previewModeState } from "@components/PostEditor";
import Iframe from "./Iframe";
import Button from "@components/common/Button";

interface Props {
  title: string;
  contents: string;
}

const ContentsViewer = ({ title, contents }: Props) => {
  const [previewMode, setPreviewMode] = useRecoilState(
    previewModeState
  );

  return (
    <div
      className={clsx(
        "w-full flex flex-col overflow-scroll"
      )}
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
              const match = /language-(\w+)/.exec(
                className || ""
              );
              const matched = match
                ? match[1]
                : "typescript";

              if (inline)
                return (
                  <code className="glassmorph p-1 rounded-md mx-1">
                    {children}
                  </code>
                );

              return (
                <SyntaxHighlighter
                  children={String(children).replace(
                    /\n$/,
                    ""
                  )}
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

      {previewMode && (
        <div className="w-full sticky left-0 bottom-0 z-50">
          <Button.Container>
            <Button.Item
              onClick={() => {
                setPreviewMode(false);
              }}
            >
              미리보기 종료
            </Button.Item>
          </Button.Container>
        </div>
      )}
    </div>
  );
};

const Paragraph = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <p
    className="text-white"
    style={{
      margin: "1em 0",
      wordBreak: "keep-all",
      lineHeight: "2em",
    }}
  >
    {children}
  </p>
);

const Blockquote = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <blockquote className="glassmorph border-l-2 my-5 p-3 pl-5 pr-2">
    {children}
  </blockquote>
);

export default ContentsViewer;

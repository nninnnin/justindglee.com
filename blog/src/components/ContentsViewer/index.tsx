import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import rehypeRaw from "rehype-raw";
import clsx from "clsx";
import { useMediaQuery } from "usehooks-ts";
import { useRecoilState } from "recoil";
import { createPortal } from "react-dom";

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

interface Props {
  title: string;
  contents: string;
}

const ContentsViewer = ({ title, contents }: Props) => {
  const [previewMode, setPreviewMode] = useRecoilState(
    previewModeState
  );

  return (
    <div className={clsx("contents-viewer")}>
      {previewMode && (
        <div
          className="absolute w-full left-0 bottom-0 z-50 bg-white text-black px-5 py-3 select-none"
          onClick={() => {
            setPreviewMode(false);
          }}
        >
          끄기
        </div>
      )}

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

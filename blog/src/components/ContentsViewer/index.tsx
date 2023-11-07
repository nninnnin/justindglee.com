import React, { useEffect } from "react";
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
  isEditable: boolean;
  title: string;
  contents: string;
}

const ContentsViewer = ({
  isEditable,
  title,
  contents,
}: Props) => {
  const [previewMode, setPreviewMode] = useRecoilState(
    previewModeState
  );

  const maxDesktop = useMediaQuery("(max-width: 1024px");

  useEffect(() => {
    if (!maxDesktop) {
      setPreviewMode(false);
    }
  }, [maxDesktop]);

  return (
    <div
      className={clsx(
        isEditable && "contents-viewer p-5",
        `flex-1 h-full overflow-auto`,
        previewMode &&
          maxDesktop &&
          "!block bg-blue-500 w-full !h-[100svh] overflow-scroll z-50 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] pb-[3em]"
      )}
    >
      {previewMode &&
        createPortal(
          <div
            className="fixed w-full bottom-0 left-0 z-50 bg-white text-black px-5 py-3 select-none"
            onClick={() => {
              setPreviewMode(false);
            }}
          >
            끄기
          </div>,
          document.body
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

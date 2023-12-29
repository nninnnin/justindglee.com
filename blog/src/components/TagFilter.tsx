import clsx from "clsx";
import { last } from "lodash";
import { pipe, toArray } from "@fxts/core";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TagInterface } from "@src/types";
import { useRecoilState } from "recoil";
import { tagFilterState } from "./PostListTemplate";

const TagFilter = ({
  tags,
}: {
  tags: Array<TagInterface>;
}) => {
  tags = useMemo(
    () => [
      { id: "", strapiId: 0, name: "", posts: [] },
      ...tags,
    ],
    [tags]
  );

  const [tagFilter, setTagFilter] =
    useRecoilState(tagFilterState);

  const firstButtonRef = useRef<HTMLElement | null>(null);
  const lastButtonRef = useRef<HTMLElement | null>(null);
  const [showPreviousButton, setShowPreviousButton] =
    useState(false);
  const [showNextButton, setShowNextButton] =
    useState(false);

  const previousTagRef = useRef<Element | null>(null);
  const nextTagRef = useRef<Element | null>(null);
  const [pageOffset, setPageOffset] = useState(0);
  const [tagPage, setTagPage] = useState(0);

  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (
      !listRef.current ||
      !firstButtonRef.current ||
      !lastButtonRef.current
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (!listRef.current) return;

        if (
          entries[0].target === listRef.current.children[0]
        ) {
          if (entries[0].intersectionRatio === 1) {
            setShowPreviousButton(false);
          } else {
            setShowPreviousButton(true);
          }
        }

        if (
          entries[0].target ===
          last(listRef.current.children)
        ) {
          if (entries[0].intersectionRatio === 1) {
            setShowNextButton(false);
          } else {
            setShowNextButton(true);
          }
        }
      },
      {
        root: listRef.current,
        threshold: 1.0,
      }
    );

    observer.observe(firstButtonRef.current);
    observer.observe(lastButtonRef.current);
  }, [
    listRef.current,
    firstButtonRef.current,
    lastButtonRef.current,
    tags,
  ]);

  useEffect(() => {
    if (!listRef.current) return;

    const { width: listWidth } =
      listRef.current.getBoundingClientRect();

    const listItems = listRef.current.children;
    const listItem = listItems[0];

    const { width: listItemWidth } =
      listItem.getBoundingClientRect();

    const childNode = listRef.current.childNodes[0];
    const nodeStyle = window.getComputedStyle(
      childNode as Element
    );
    const marginRight =
      nodeStyle.getPropertyValue("margin-right");
    const numberOfItems = Math.floor(
      listWidth /
        (listItemWidth + Number(marginRight.split("px")[0]))
    );

    setPageOffset(numberOfItems);

    previousTagRef.current = listRef.current.children[0];
    nextTagRef.current =
      listRef.current.children[numberOfItems + 1];

    if (numberOfItems < listRef.current.children.length) {
      setShowNextButton(true);
    }
  }, [listRef.current]);

  const tagFilters = pipe(
    tags,
    (tags) =>
      tags.map(
        (tag, i, tags) => (
          <li
            className={clsx(
              "glassmorph-listitem-small rounded-md",
              "mr-2 p-2 py-1",
              "relative z-1",
              "text-[0.8rem]",

              "whitespace-nowrap",
              "cursor-pointer",
              "hover:text-white",
              tagFilter === tag.name
                ? "text-white"
                : "text-[rgba(255,255,255,0.3)]",
              "select-none"
            )}
            ref={(ref) => {
              if (i === 0) firstButtonRef.current = ref;
              if (i === tags.length - 1)
                lastButtonRef.current = ref;
            }}
            onClick={() => setTagFilter(tag.name)}
          >
            {tag.name || "전체보기"}
          </li>
        ),
        tags
      ),
    toArray
  );

  const handleButtonClick = (e: React.MouseEvent) => {
    if (!listRef.current) return;

    const buttonRole = (e.target as HTMLSpanElement).dataset
      .buttonRole;

    if (buttonRole === "prev") {
      previousTagRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });

      const newTagPage = Math.max(tagPage - pageOffset, 0);

      const prevPage = Math.max(newTagPage - pageOffset, 0);
      const nextPage = newTagPage + pageOffset;

      previousTagRef.current =
        listRef.current.children[prevPage];
      nextTagRef.current =
        listRef.current.children[nextPage];

      setTagPage(newTagPage);
    }

    if (buttonRole === "next") {
      nextTagRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });

      const newTagPage = Math.min(
        tagPage + pageOffset,
        listRef.current.children.length
      );

      const prevPage = newTagPage - pageOffset;
      const nextPage = Math.min(
        newTagPage + pageOffset,
        listRef.current.children.length
      );

      previousTagRef.current =
        listRef.current.children[prevPage];
      nextTagRef.current =
        listRef.current.children[nextPage];

      setTagPage(newTagPage);
    }
  };

  return (
    <div
      className={clsx("relative", "mt-[-1em]")}
      onClick={handleButtonClick}
    >
      {showPreviousButton && (
        <span
          data-button-role="prev"
          className={clsx(
            "absolute left-0 top-0 z-10",
            "text-[0.9rem] text-white/80 hover:text-white transition duration-100",
            "w-[30px] min-h-full",
            "flex items-center justify-end",
            "cursor-pointer select-none"
          )}
        >
          ←
        </span>
      )}

      <ul
        className={clsx(
          "flex w-full min-h-full",
          "overflow-hidden",
          "min-h-[50px] p-[16px] pl-0 pr-0"
        )}
        ref={listRef}
      >
        {tagFilters}
      </ul>

      {showNextButton && (
        <span
          data-button-role="next"
          className={clsx(
            "absolute right-0 top-0 z-10",
            "text-[0.9rem] text-white/80 hover:text-white transition duration-100",
            "w-[30px] min-h-full pr-3",
            "flex items-center justify-end",
            "cursor-pointer select-none"
          )}
        >
          →
        </span>
      )}
    </div>
  );
};

export default TagFilter;

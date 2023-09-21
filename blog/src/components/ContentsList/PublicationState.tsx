import { PublicationStates } from "@src/types";
import clsx from "clsx";
import React from "react";

interface Props {
  publicationState: PublicationStates;
}

const PublicationState = ({ publicationState }: Props) => {
  return (
    <>
      {publicationState === "draft" && (
        <div
          className={clsx(
            "flex self-center",
            "text-[0.8rem]",
            "border-white border-[2px] h-fit px-1 rounded",
            ""
          )}
        >
          draft
        </div>
      )}

      {publicationState === "publishing" && (
        <div
          className={clsx(
            "flex self-center",
            "text-[0.8rem]",
            "border-white border-[2px] h-fit px-1 rounded",
            ""
          )}
        >
          publishing
        </div>
      )}

      {publicationState === "published" && (
        <div
          className={clsx(
            "flex self-center",
            "text-[0.8rem]",
            "border-transparent border-[2px] h-fit px-1 rounded",
            "bg-white text-blue-400 text-shadow-none"
          )}
        >
          published
        </div>
      )}
    </>
  );
};

export default PublicationState;

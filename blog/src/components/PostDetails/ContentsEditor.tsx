import React, { ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";

interface Props {
  isEditable: true;
  postId: number;
  title: string;
  editingContents: string;
  onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContentsEditor = ({
  isEditable,
  postId,
  title,
  editingContents,
  onChangeContents,
}: Props) => {
  const savePost = async () => {
    try {
      const token = localStorage.getItem("justinblog-token");

      const response = await axios.put(
        `${process.env.GATSBY_STRAPI_API_URL}/api/posts/${postId}`,
        {
          data: {
            contents: editingContents,
          },
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      console.log("변경 결과", response);

      alert("수정 성공!");
    } catch (error) {
      console.log("변경중 에러 발생");
      console.log(error);
    }
  };

  return (
    <div className="contents-editor flex flex-col flex-1 mr-5">
      <h1 className={`header ${isEditable && "!pb-0"}`}>{title}</h1>
      <textarea
        className={`w-full flex-1 bg-white text-blue-500 ${
          isEditable && "p-5"
        } mt-5 border-none outline-none`}
        value={editingContents}
        onChange={onChangeContents}
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Tab") {
            e.preventDefault();

            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const TAB_SIZE = 2;

            const tabAddedValue =
              e.currentTarget.value.substring(0, start) +
              " ".repeat(TAB_SIZE) +
              e.currentTarget.value.substring(end);

            e.currentTarget.value = tabAddedValue;

            e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
              start + TAB_SIZE;
          }
        }}
      />

      <button
        onClick={async () => {
          await savePost();
        }}
        className="p-5 bg-green-300"
      >
        수정하기
      </button>
    </div>
  );
};

export default ContentsEditor;

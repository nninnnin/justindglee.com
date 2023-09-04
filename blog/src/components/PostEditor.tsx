import Authorizer from "@components/Authorizer";
import Layout from "@components/Layout";
import ContentsEditor from "@components/ContentsEditor";
import ContentsViewer from "@components/ContentsViewer";
import React, { ReactNode, useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { styled } from "styled-components";

export const editingTitleState = atom({
  key: "editingTitleState",
  default: "",
});
export const editingContentsState = atom({
  key: "editingContentsState",
  default: "",
});

interface Props {
  title: string;
  contents: string;
  button: ReactNode;
}

const PostEditor = ({ title, contents, button }: Props) => {
  const [editingTitle, setEditingTitle] = useRecoilState(
    editingTitleState
  );
  const [editingContents, setEditingContents] =
    useRecoilState(editingContentsState);

  useEffect(() => {
    setEditingTitle(title);
    setEditingContents(contents);
  }, [title, contents]);

  return (
    <Authorizer>
      <Layout isEditing={true}>
        <Container>
          <ContentsEditor
            title={editingTitle}
            contents={editingContents}
            onChangeTitle={(e) => {
              setEditingTitle(e.currentTarget.value);
            }}
            onChangeContents={(e) => {
              setEditingContents(e.currentTarget.value);
            }}
            buttons={button}
          />

          <ContentsViewer
            title={editingTitle}
            contents={editingContents}
            isEditable={true}
          />
        </Container>
      </Layout>
    </Authorizer>
  );
};

export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export default PostEditor;

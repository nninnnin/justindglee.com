import Authorizer from "@components/Authorizer";
import Layout from "@components/Layout";
import ContentsEditor from "@components/ContentsEditor";
import ContentsViewer from "@components/ContentsViewer";
import React, { ReactNode, useEffect } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { styled } from "styled-components";

export const editingTitleState = atom({
  key: "editingTitleState",
  default: "",
});

export const editingContentsState = atom({
  key: "editingContentsState",
  default: "",
});

export const previewModeState = atom({
  key: "previewModeState",
  default: false,
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

  const previewMode = useRecoilValue(previewModeState);

  console.log(previewMode);

  return (
    <Authorizer>
      <Layout>
        <Container>
          {!previewMode && (
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
          )}

          {previewMode && (
            <ContentsViewer
              title={editingTitle}
              contents={editingContents}
            />
          )}
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

import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export const POST_TYPES: Record<string, string> = {
  tech: "기술",
  life: "생활",
};

const defaultValue = Object.keys(POST_TYPES)[0];

const selectedPostTypeState = atom({
  key: "SelectedPostTypeState",
  default: defaultValue,
});

const usePostType = () => {
  const [selectedPostType, setSelectedPostType] =
    useRecoilState(selectedPostTypeState);

  useEffect(() => {
    return () => {
      setSelectedPostType(defaultValue);
    };
  }, []);

  return { selectedPostType, setSelectedPostType };
};

export default usePostType;

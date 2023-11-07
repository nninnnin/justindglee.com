import { useLocation } from "@gatsbyjs/reach-router";
import { last } from "lodash";

const useEditingState = () => {
  const location = useLocation();

  const isEditing =
    last(
      location.pathname.split("/").filter((el) => el)
    ) === "edit";

  return isEditing;
};

export default useEditingState;

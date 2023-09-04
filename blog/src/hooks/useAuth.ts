import axios from "axios";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

const isAuthorizedState = atom<boolean | null>({
  key: "IsAuthorizedState",
  default: null,
});

const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useRecoilState(
    isAuthorizedState
  );

  useEffect(() => {
    const token = localStorage.getItem("justinblog-token");

    if (!token) {
      setIsAuthorized(false);

      return;
    }

    (async () => {
      try {
        await axios.post(
          `${process.env.GATSBY_STRAPI_API_URL}/api/users-permissions/token/decrypt`,
          {
            token,
          }
        );

        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);

        console.log(error);
      }
    })();
  }, []);

  return { isAuthorized };
};

export default useAuth;

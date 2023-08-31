import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<
    boolean | null
  >(null);

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
            token: token,
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

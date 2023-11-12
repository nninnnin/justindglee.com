import React, { useEffect } from "react";
import useAuth from "@src/hooks/useAuth";
import { useLocation } from "@reach/router";
import Loading from "./common/Loading";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
}

const Authorizer = ({ children, disabled }: Props) => {
  const { isAuthorized } = useAuth();
  const params = useLocation();

  useEffect(() => {
    if (disabled) return;

    if (isAuthorized === false) {
      location.href =
        "/login" + `?redirectTo=${params.href}`;
    }
  }, [isAuthorized, disabled]);

  if (isAuthorized === null && !disabled)
    return <Loading>토큰 유효성 판독중..</Loading>;

  return <div>{children}</div>;
};

export default Authorizer;

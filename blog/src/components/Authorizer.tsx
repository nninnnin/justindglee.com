import React, { useEffect } from "react";
import useAuth from "@src/hooks/useAuth";
import { useLocation } from "@reach/router";

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
    return (
      <div className="w-[100vw] h-[100svh] bg-blue-500 text-white grid place-items-center bounce">
        토큰 유효성 판독중..
      </div>
    );

  return <div>{children}</div>;
};

export default Authorizer;
